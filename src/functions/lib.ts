
import { onCall } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import * as admin from 'firebase-admin';

// Initialize the Admin SDK only once
if (admin.apps.length === 0) {
    admin.initializeApp();
}

/**
 * A Cloud Function to set an 'admin' custom claim on a user.
 * This function is callable from the client-side.
 */
export const setAdminRole = onCall(async (request) => {
    // Check if the user is authenticated.
    if (!request.auth) {
        logger.warn('Unauthenticated user tried to call setAdminRole');
        // It's important to throw an error for unauthenticated access.
        throw new Error('Authentication required.');
    }

    const callingUserEmail = request.auth.token.email;
    const adminEmail = 'goenkakrish02@gmail.com'; // The designated admin email.

    // If the email is not provided, we can't do anything.
    if (!callingUserEmail) {
        logger.warn('setAdminRole called without an email.');
        throw new Error('Email not provided in the request.');
    }

    // Only set the claim if the email matches the admin email.
    if (callingUserEmail === adminEmail) {
        try {
            const user = await admin.auth().getUserByEmail(callingUserEmail);
            // Set custom claim for admin role. This can be used for security rules.
            await admin.auth().setCustomUserClaims(user.uid, { admin: true });
            
            // Also update the role in the Firestore document for client-side checks.
            const userRef = admin.firestore().collection('users').doc(user.uid);
            await userRef.update({ role: 'admin' });

            logger.info(`Successfully set admin claim and role for ${callingUserEmail}`);
            return { message: `Success! ${callingUserEmail} has been made an admin.` };
        } catch (error) {
            logger.error(`Error setting admin claim for ${callingUserEmail}:`, error);
            // Throw an error to let the client know something went wrong.
            throw new Error('An error occurred while setting the admin role.');
        }
    } else {
        // For any other user, just log their signup.
        logger.info(`Non-admin user signed up: ${callingUserEmail}`);
        return { message: 'No admin privileges assigned.' };
    }
});
