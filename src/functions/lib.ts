
import { onCall } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import * as admin from 'firebase-admin';

// Initialize the Admin SDK only once
if (admin.apps.length === 0) {
    admin.initializeApp();
}

/**
 * A Cloud Function to set an 'admin' custom claim on a user upon their creation.
 * This function is callable from the client-side but should only grant
 * admin privileges based on a server-side check.
 */
export const setAdminRole = onCall(async (request) => {
    // Check if the user is authenticated.
    if (!request.auth) {
        logger.warn('Unauthenticated user tried to call setAdminRole');
        throw new Error('Authentication required.');
    }

    const callingUserEmail = request.auth.token.email;
    const adminEmail = 'goenkakrish02@gmail.com'; // The designated admin email.
    const uid = request.auth.uid;

    if (!callingUserEmail) {
        logger.warn('setAdminRole called by a user without an email.');
        return { message: 'Caller has no email.'};
    }
    
    // Only the specified admin can get the admin role.
    if (callingUserEmail === adminEmail) {
        try {
            // Set custom claim for admin role.
            await admin.auth().setCustomUserClaims(uid, { admin: true });
            
            // Also update the role in the Firestore document for client-side checks.
            const userRef = admin.firestore().collection('users').doc(uid);
            await userRef.update({ role: 'admin' });

            logger.info(`Successfully set admin claim and role for ${callingUserEmail}`);
            return { message: `Success! ${callingUserEmail} has been made an admin.` };
        } catch (error) {
            logger.error(`Error setting admin claim for ${callingUserEmail}:`, error);
            throw new Error('An error occurred while setting the admin role.');
        }
    }

    // For any other user, just log their signup.
    logger.info(`Non-admin user signed up: ${callingUserEmail}. No admin privileges assigned.`);
    return { message: 'No admin privileges assigned.' };
});
