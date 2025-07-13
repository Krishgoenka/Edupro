
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
        return { message: 'Authentication required.' };
    }

    const email = request.data.email;
    const adminEmail = 'goenkakrish02@gmail.com';

    // Only set the claim if the email matches the admin email.
    if (email === adminEmail) {
        try {
            const user = await admin.auth().getUserByEmail(email);
            await admin.auth().setCustomUserClaims(user.uid, { admin: true });
            logger.info(`Successfully set admin claim for ${email}`);
            return { message: `Success! ${email} has been made an admin.` };
        } catch (error) {
            logger.error(`Error setting admin claim for ${email}:`, error);
            return { message: 'An error occurred while setting the admin role.' };
        }
    } else {
        logger.info(`Non-admin user signed up: ${email}`);
        return { message: 'No admin privileges assigned.' };
    }
});
