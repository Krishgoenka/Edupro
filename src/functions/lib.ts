
import { onCall } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import * as admin from 'firebase-admin';

// Initialize the Admin SDK only once
if (admin.apps.length === 0) {
    admin.initializeApp();
}

/**
 * A Cloud Function that can be used for post-signup operations.
 * Currently, it only logs the new user's email.
 */
export const setAdminRole = onCall(async (request) => {
    // Check if the user is authenticated.
    if (!request.auth) {
        logger.warn('Unauthenticated user tried to call setAdminRole');
        return { message: 'Authentication required.' };
    }

    const email = request.data.email;

    // This function can be extended in the future to handle role assignments
    // or other post-signup tasks. For now, it just logs the event.
    if (email) {
        logger.info(`New user signed up: ${email}`);
        return { message: 'User creation event logged.' };
    } else {
        logger.warn('setAdminRole called without an email.');
        return { message: 'Email not provided.' };
    }
});

