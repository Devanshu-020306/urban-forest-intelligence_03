// Run this script once to create demo accounts
// Usage: npx ts-node scripts/setup-demo-accounts.ts

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAIgTAhgSc-UdwSdsbhzBElOchacVTJMp4",
  authDomain: "urban-forest-tracker.firebaseapp.com",
  projectId: "urban-forest-tracker",
  storageBucket: "urban-forest-tracker.firebasestorage.app",
  messagingSenderId: "815897853895",
  appId: "1:815897853895:web:7fded24e59f43395e7e3e2",
  measurementId: "G-PE3XWCNFHX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function setupDemoAccounts() {
  const accounts = [
    { email: 'admin@urbanforest.com', password: 'admin123' },
    { email: 'visitor@urbanforest.com', password: 'visitor123' }
  ];

  for (const account of accounts) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        account.email,
        account.password
      );
      console.log(`✓ Created account: ${account.email}`);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        console.log(`✓ Account already exists: ${account.email}`);
      } else {
        console.error(`✗ Error creating ${account.email}:`, error.message);
      }
    }
  }

  console.log('\nDemo accounts setup complete!');
  process.exit(0);
}

setupDemoAccounts();
