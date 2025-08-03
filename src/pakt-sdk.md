let's integrate pakt sdk. take it step by step

================================================ FILE: README.md
================================================
![Alt PAKT](https://s3.amazonaws.com/storage-paktbuild.chain.site/public/mdrvr2d2_pakt_sdk.png)

# PAKT SDK

PAKT SDK is a comprehensive software development kit for building applications
on the PAKT Operating System. It provides a complete suite of tools for project
collaboration, blockchain payments, user management, and more.collaboration,
blockchain payments, user management, and more.

## Installation

To install PAKT SDK, simply

```bash
npm install pakt-sdk
# OR
yarn add pakt-sdk
# OR
pnpm add pakt-sdk
```

## Quick Start

```typescript
import PaktSDK from "pakt-sdk";

const sdk = await PaktSDK.init({
    baseUrl: "https://api.pakt.world", // Required: API base URL
    verbose: true, // Optional: Enable detailed logging
    testnet: false, // Optional: Use testnet environment
});

// Now you can use all SDK features
const loginResponse = await sdk.auth.login({
    email: "user@example.com",
    password: "yourpassword",
});
```

## Table of Contents

- [Authentication](#authentication)
- [Account Management](#account-management)
- [Collections (Projects)](#collections-projects)
- [Wallet & Payments](#wallet--payments)
- [Direct Deposits](#direct-deposits)
- [Communication](#communication)
- [File Management](#file-management)
- [User Verification](#user-verification)
- [Bookmarks](#bookmarks)
- [Reviews & Ratings](#reviews--ratings)
- [Additional Features](#additional-features)
- [Error Handling](#error-handling)
- [TypeScript Support](#typescript-support)

---

## Authentication

The authentication module provides complete user registration, login, password
management, and OAuth integration.

### Login

```typescript
import { LoginPayload } from "pakt-sdk";

const loginData: LoginPayload = {
    email: "user@example.com",
    password: "yourpassword",
};

const sdkInit = await PaktSDK.init(configData);
const response = await sdk.auth.login(loginData);

if (response.status === "success") {
    console.log("Logged in successfully");
    console.log("User data:", response.data);
    // Token is automatically stored for subsequent requests
}
```

### Registration

```typescript
import { RegisterPayload } from "pakt-sdk";

const registrationData: RegisterPayload = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: "securepassword",
    confirmPassword: "securepassword",
    referral: "optional-referral-code", // Optional
    type: "talent", // Optional: "talent" or "business"
};

const sdkInit = await PaktSDK.init(configData);

const response = await sdk.auth.register(registrationData);

if (response.status === "success") {
    // Registration successful, but account needs verification
    console.log("Registration successful, check email for verification");
}
```

### Account Verification

After registration, users need to verify their account:

```typescript
const verificationResponse = await sdk.auth.verifyAccount({
    tempToken: "token-from-registration",
    token: "verification-token-from-email",
});

if (verificationResponse.status === "success") {
    console.log("Account verified successfully");
    // User is now fully authenticated
}
```

### Password Management

#### Reset Password

```typescript
// Send password reset email
await sdk.auth.resetPassword({
    email: "user@example.com",
});

// Change password with reset token
await sdk.auth.changePassword({
    token: "reset-token-from-email",
    tempToken: "temp-token",
    password: "newpassword",
});
```

### Google OAuth Integration

```typescript
// Step 1: Generate OAuth URL
const oauthResponse = await sdk.auth.googleOAuthGenerateState();
const { googleAuthUrl, state } = oauthResponse.data;

// Redirect user to googleAuthUrl

// Step 2: Validate OAuth callback
const validationResponse = await sdk.auth.googleOAuthValidateState({
    state: "state-from-step-1",
    code: "authorization-code-from-callback",
});

if (validationResponse.data.type === "sign_up") {
    // New user registered via Google
} else {
    // Existing user signed in
}
```

### Referral Validation

```typescript
const referralResponse = await sdk.auth.validateReferral("referral-token");

if (referralResponse.data.valid) {
    console.log(`Valid referral from user ${referralResponse.data.userId}`);
    console.log(
        `Referral counts: ${referralResponse.data.referralCounts}/${referralResponse.data.totalAllowedReferrals}`
    );
}
```

## Account Management

### Example

### Get Current User Profile

```typescript
const userProfile = await sdk.account.getUser();
console.log("Current user:", userProfile.data);
```

### Update User Profile

```typescript
import { UpdateUserDto } from "pakt-sdk";

const profileUpdate: UpdateUserDto = {
    profile: {
        contact: {
            city: "New York",
            state: "NY",
            country: "USA",
            phone: "+1234567890",
        },
        bio: {
            title: "Full-Stack Developer",
            description:
                "Experienced developer with expertise in React and Node.js",
        },
        talent: {
            availability: "available", // "available" | "busy" | "working"
            tags: ["React", "Node.js", "TypeScript"],
            tagsIds: ["tag-id-1", "tag-id-2"],
            tagsCategory: "development",
            about: "I love building scalable web applications",
        },
        socials: {
            github: "https://github.com/username",
            linkedin: "https://linkedin.com/in/username",
            twitter: "https://twitter.com/username",
        },
    },
    isPrivate: false,
};

const response = await sdk.account.updateAccount(profileUpdate);
```

### User Onboarding

Complete the initial onboarding process:

```typescript
import { UserOnboardDto } from "pakt-sdk";

const onboardingData: UserOnboardDto = {
    profile: {
        bio: {
            title: "Software Developer",
            description: "Building amazing applications",
        },
        talent: {
            availability: "available",
            tags: ["JavaScript", "React"],
            tagsCategory: "development",
        },
    },
};

await sdk.account.onboardEndpoint(onboardingData);
```

### Two-Factor Authentication (2FA)

#### Setup 2FA

```typescript
// Initiate 2FA setup
const twoFAResponse = await sdk.account.initate2FA({
    type: "google_auth", // or "email"
    password: "current-password",
});

// For Google Authenticator, use the provided QR code
console.log("QR Code:", twoFAResponse.data.qrCode);

// Activate 2FA with verification code
await sdk.account.activate2FA({
    code: "123456", // Code from authenticator app
    type: "google_auth",
});
```

#### Use 2FA for Login

`````typescript
// When 2FA is enabled, use email 2FA
await sdk.account.sendEmailTwoFA({
  type: "email",
  tempToken: "temp-token-from-login",
});
```

### User Search and Discovery

````typescript
import { FilterUserDto } from "pakt-sdk";

const searchFilters: FilterUserDto = {
  tags: ["React", "Node.js"],
  type: "talent",
  scoreRange: { min: 80, max: 100 },
  limit: 20,
  offset: 0,
};

const users = await sdk.account.getUsers(searchFilters);
`````

---

## Collections (Projects)

Collections are the core entity representing projects, jobs, or collaborative
work in the PAKT ecosystem.

### Create a Collection

```typescript
import { CreateCollectionDto } from "pakt-sdk";

const newCollection: CreateCollectionDto = {
    name: "E-commerce Website Development",
    description: "Build a modern e-commerce platform",
    collectionType: "development-project",
    isPrivate: false,
    deliveryDate: new Date("2024-12-31"),
    tags: ["React", "Node.js", "E-commerce"],
    maxParticipants: 3,
    budget: {
        amount: 5000,
        currency: "USD",
    },
};

const collection = await sdk.collection.create(newCollection);
console.log("Collection created:", collection.data._id);
```

### Get Collections

```typescript
// Get all collections with filters
const collections = await sdk.collection.getAll({
    status: "ongoing",
    limit: 10,
    offset: 0,
});

// Get specific collection
const collection = await sdk.collection.getById("collectionId");
```

### Update Collection

`````typescript
import { UpdateCollectionDto } from "pakt-sdk";

const updates: UpdateCollectionDto = {
  description: "Updated project description",
  status: "ongoing",
  deliveryDate: new Date("2024-12-31"),
};

await sdk.collection.updateCollection("collection-id", updates);
```

### Collection Types

````typescript
// Get all available collection types
const types = await sdk.collection.getTypes();

// Get specific collection type
const type = await sdk.collection.getACollectionType("_id");
`````

### Bulk Operations

```typescript
// Create multiple collections
const collectionsData = [
    /* array of CreateCollectionDto */
];
await sdk.collection.createMany(collectionsData);

// Update multiple collections
const updates = [
    /* array of updates with IDs */
];
await sdk.collection.updateManyCollections(updates);
```

---

## Wallet & Payments

Comprehensive blockchain-based payment system with multi-cryptocurrency support.

### Wallet Management

```typescript
// Get all user wallets
const wallets = await sdk.wallet.getWallets();

wallets.data.forEach((wallet) => {
    console.log(
        `${wallet.coin.toUpperCase()}: $${wallet.balance.spendable} available`
    );
    console.log(`Locked: $${wallet.balance.locked}`);
});

// Get specific wallet by cryptocurrency
const usdcWallet = await sdk.wallet.getSingleWalletByCoin("usdc");
const avaxWallet = await sdk.wallet.getSingleWalletByCoin("avax");
```

### Payment Processing

```typescript
import { ICreatePaymentDto } from "pakt-sdk";

// Create payment order
const paymentOrder: ICreatePaymentDto = {
    coin: "usdc", // or "avax"
    collectionId: "collectionId",
};

const payment = await sdk.payment.create(paymentOrder);

if (payment.status === "success") {
    console.log("Payment order created");
    console.log("Amount to pay:", payment.data.amount);
    console.log("Blockchain address:", payment.data.address);
    console.log("Required confirmations:", payment.data.confirmation);
}
```

### Payment Validation & Release

```typescript
// Validate payment transaction
const validation = await sdk.payment.validate({
    paymentId: "payment-id",
    transactionHash: "blockchain-tx-hash",
});

// Release escrowed payment (for collection completion)
await sdk.payment.release({
    collectionId: "collectionId",
    recipientId: "user-id",
});
```

### Transaction History

```typescript
// Get all transactions
const transactions = await sdk.wallet.getTransactions({
    limit: 50,
    offset: 0,
    type: "sent", // Optional: filter by transaction type
});

// Get specific transaction
const transaction = await sdk.wallet.getATransaction("transaction-id");

// Get transaction statistics
const stats = await sdk.wallet.getTransactionStats("usdc");
console.log("Total sent:", stats.data.totalSent);
console.log("Total received:", stats.data.totalReceived);
```

### Cryptocurrency Exchange Rates

```typescript
// Get current exchange rates
const exchange = await sdk.wallet.getExchange();

console.log("USDC to USD:", exchange.data.usdc.usd);
console.log("AVAX to USD:", exchange.data.avax.usd);
```

### Withdrawals

```typescript
import { CreateWithdrawal } from "pakt-sdk";

const withdrawalRequest: CreateWithdrawal = {
    coin: "usdc",
    amount: 100.5,
    address: "0x742d35Cc6634C0532925a3b8D6cf1C4394c64DF8",
    password: "account-password",
};

const withdrawal = await sdk.withdrawal.createWithdrawal(withdrawalRequest);

// Check withdrawal status
const withdrawals = await sdk.withdrawal.fetchWithdrawal({
    limit: 10,
    offset: 0,
});
```

---

## Direct Deposits

Direct deposits allow for streamlined collection funding and validation without
going through the traditional escrow process.

### Create Direct Deposit

```typescript
import { ICreateDirectDepositPayload } from "pakt-sdk";

const directDepositData: ICreateDirectDepositPayload = {
    collectionType: "development-project",
    amount: 1000,
    coin: "usdc", // or "avax"
    name: "Project Direct Funding",
    description: "Direct deposit for project completion",
    owner: "user-id",
};

const directDeposit = await sdk.directDeposit.createDirectDeposit({
    authToken: "your-auth-token",
    payload: directDepositData,
});

if (directDeposit.status === "success") {
    console.log("Direct deposit created");
    console.log("Collection ID:", directDeposit.data.collectionId);
    console.log("Payment address:", directDeposit.data.address);
    console.log("Amount to pay:", directDeposit.data.amountToPay);
    console.log("Expected fee:", directDeposit.data.expectedFee);
    console.log("Chain ID:", directDeposit.data.chainId);
}
```

### Validate Direct Deposit

```typescript
import { IValidateDirectDepositPayload } from "pakt-sdk";

const validationData: IValidateDirectDepositPayload = {
    collection: "collection-id",
    method: "blockchain", // validation method
    status: "completed", // deposit status
    owner: "owner-user-id",
    meta: {
        transactionHash: "0x...",
        blockNumber: 123456,
    },
    release: true, // whether to release funds immediately
};

const validation = await sdk.directDeposit.validateDirectDeposit({
    authToken: "your-auth-token",
    payload: validationData,
});

if (validation.status === "success") {
    console.log("Direct deposit validated");
    console.log("Collection updated:", validation.data);
}
```

### Get Payment Methods

```typescript
// Get available blockchain payment methods for direct deposits
const paymentMethods =
    await sdk.directDeposit.fetchPaymentMethods("your-auth-token");

paymentMethods.data.forEach((coin) => {
    console.log(`${coin.name} (${coin.symbol})`);
    console.log(`Contract: ${coin.contractAddress}`);
    console.log(`Chain ID: ${coin.rpcChainId}`);
    console.log(`Active: ${coin.active}`);
});
```

### Get Active RPC Configuration

```typescript
// Get current blockchain RPC server configuration
const rpcConfig = await sdk.directDeposit.fetchActiveRPC("your-auth-token");

if (rpcConfig.status === "success") {
    console.log("RPC Name:", rpcConfig.data.rpcName);
    console.log("Chain ID:", rpcConfig.data.rpcChainId);
    console.log("RPC URLs:", rpcConfig.data.rpcUrls);
    console.log("Block Explorer:", rpcConfig.data.blockExplorerUrls);
    console.log("Native Currency:", rpcConfig.data.rpcNativeCurrency);
}
```

### Direct Deposit vs Regular Payment

Direct deposits offer several advantages over regular escrow payments:

- **Faster Processing**: No escrow holding period
- **Lower Fees**: Reduced transaction costs
- **Immediate Release**: Funds can be released immediately upon validation
- **Simplified Workflow**: Direct collection funding without complex escrow
  management

Use direct deposits when:

- You have established trust with the collection owner
- The project requires immediate funding
- You want to minimize transaction fees and complexity

---

## Communication

### Invitations

Send and manage project collaboration invites:

```typescript
import { SendInviteDto } from "pakt-sdk";

// Send invite
const inviteData: SendInviteDto = {
    receiverId: "user-id",
    collectionId: "project-id",
};

const invite = await sdk.invite.sendInvite(inviteData);

// Manage invites
await sdk.invite.acceptInvite("invite-id");
await sdk.invite.declineInvite("invite-id");
await sdk.invite.cancelInvite("invite-id");

// Get all invites
const invites = await sdk.invite.getAll({
    status: "pending",
    limit: 10,
});
```

### Chat System

```typescript
// Get user messages/conversations
const messages = await sdk.chat.getUserMessages({
    limit: 50,
    offset: 0,
});

messages.data.forEach((conversation) => {
    console.log("Conversation with:", conversation.recipients);
    conversation.messages.forEach((message) => {
        console.log(`${message.sender}: ${message.content}`);
    });
});
```

### Notifications

```typescript
// Get all notifications
const notifications = await sdk.notifications.getAll({
    limit: 20,
    offset: 0,
});

// Mark notifications as read
await sdk.notifications.markAll(); // Mark all as read
await sdk.notifications.markOneAsRead("notification-id"); // Mark specific notification
```

### Activity Feeds

```typescript
import { CreateFeedDto } from "pakt-sdk";

// Create feed entry
const feedEntry: CreateFeedDto = {
    type: "COLLECTION_CREATED",
    title: "New Project Created",
    description: "Started working on e-commerce platform",
    isPublic: true,
    data: "collectionId",
};

await sdk.feed.create(feedEntry);

// Get activity feeds
const feeds = await sdk.feed.getAll({
    limit: 10,
    isPublic: true,
});

// Dismiss feeds
await sdk.feed.dismissAFeed("feed-id");
await sdk.feed.dismissAllFeeds();
```

---

## File Management

### File Upload

```typescript
import { CreateFileUpload } from "pakt-sdk";

const fileData: CreateFileUpload = {
    file: fileBuffer, // or file data
    fileName: "document.pdf",
    fileType: "application/pdf",
};

const upload = await sdk.file.fileUpload(fileData);
console.log("File uploaded:", upload.data.url);
```

### File Management

```typescript
// Get all uploaded files
const files = await sdk.file.getFileUploads({
    limit: 20,
    offset: 0,
});

// Get specific file
const file = await sdk.file.getAFileUpload("file-id");
```

---

## User Verification

Complete identity verification system using third-party verification services.

### Start Verification Session

```typescript
import { ICreateSessionPayload } from "pakt-sdk";

const verificationData: ICreateSessionPayload = {
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "1990-01-01",
    address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        postalCode: "10001",
        country: "US",
    },
    documentType: "passport", // or "driving_license", "national_id"
    documentCountry: "US",
};

const session = await sdk.userVerification.createSession(verificationData);
console.log("Verification session created:", session.data.sessionId);
```

### Upload Verification Documents

```typescript
import { ISendSessionMedia } from "pakt-sdk";

// Upload document photo
const documentMedia: ISendSessionMedia = {
    sessionId: "session-id",
    mediaType: "document",
    file: documentImageBuffer,
};

await sdk.userVerification.sendSessionMedia(documentMedia);

// Upload face photo for verification
const faceMedia: ISendSessionMedia = {
    sessionId: "session-id",
    mediaType: "face",
    file: facePhotoBuffer,
};

await sdk.userVerification.sendSessionMedia(faceMedia);
```

### Check Verification Status

```typescript
// Get verification attempts
const attempts = await sdk.userVerification.getSessionAttempts({
    limit: 10,
    offset: 0,
});

// Get user verification status
const verifications = await sdk.userVerification.getUserVerifications({
    limit: 5,
    offset: 0,
});

verifications.data.forEach((verification) => {
    console.log("Status:", verification.status);
    console.log("Provider:", verification.provider);
    console.log("Document verified:", verification.documentVerified);
    console.log("Face verified:", verification.faceVerified);
});
```

---

## Bookmarks

```typescript
import { createBookMarkDto } from "pakt-sdk";

// Create bookmark
const bookmark: createBookMarkDto = {
    data: "collectionId", // or feed-id, user-id, invite-id
    type: "collection", // or "feed", "user", "invite"
};

await sdk.bookmark.create(bookmark);

// Get bookmarks
const bookmarks = await sdk.bookmark.getAll({
    type: "collection",
    limit: 10,
});

// Delete bookmark
await sdk.bookmark.delete("bookmark-id");
```

---

## Reviews & Ratings

```typescript
import { AddReviewDto } from "pakt-sdk";

// Add review for completed collection
const reviewData: AddReviewDto = {
    collectionId: "collection-id",
    receiverId: "user-id",
    rating: 5, // 1-5 scale
    text: "Excellent work, highly recommended!",
};

await sdk.review.addReview(reviewData);

// Get reviews
const reviews = await sdk.review.viewAll({
    collectionId: "collection-id",
    limit: 10,
});
```

---

## Additional Features

### Connection Filtering

```typescript
import { CreateConnectionFilterDto } from "pakt-sdk";

// Create automatic connection filter
const filter: CreateConnectionFilterDto = {
    event: "CREATE_CONVERSATION",
    key: "afroScore",
    value: "80",
    decider: "greater_than", // Only connect with users having score > 80
};

await sdk.connectionFilter.create(filter);

// Get user's connection filters
const filters = await sdk.connectionFilter.getForAUser("user-id");
```

---

## Error Handling

All SDK methods return a consistent response format:

```typescript
interface ResponseDto<T> {
    status: "success" | "error";
    message: string;
    data: T;
    statusCode?: number;
    code?: number;
}

// Example error handling
try {
    const response = await sdk.auth.login(loginData);

    if (response.status === "error") {
        console.error("Login failed:", response.message);
        return;
    }

    // Success - use response.data
    console.log("User:", response.data);
} catch (error) {
    console.error("Network or unexpected error:", error);
}
```

---

## TypeScript Support

The SDK is built with TypeScript and provides comprehensive type definitions:

```typescript
import {
    PaktSDK,
    LoginPayload,
    RegisterPayload,
    CreateCollectionDto,
    IUser,
    IWalletDto,
    ResponseDto,
} from "pakt-sdk";

// All interfaces and types are available for import
const loginPayload: LoginPayload = {
    email: "user@example.com",
    password: "password",
};

const response: ResponseDto<LoginDto> = await sdk.auth.login(loginPayload);
```

---

## Configuration Options

```typescript
interface PaktConfig {
    baseUrl: string; // Required: API base URL
    testnet?: boolean; // Optional: Use testnet environment (default: false)
    verbose?: boolean; // Optional: Enable detailed logging (default: false)
}

const sdk = await PaktSDK.init({
    baseUrl: "https://api.pakt.world",
    testnet: false,
    verbose: true,
});
```

---

## Links & Resources

- **Documentation**:
  [https://pakt-1.gitbook.io/pakt-sdk/web-sdk/overview/getting-started](https://pakt-1.gitbook.io/pakt-sdk/web-sdk/overview/getting-started)
- **Sample Project**:
  [https://github.com/Jendorski/PAKT-SDK-Sample](https://github.com/Jendorski/PAKT-SDK-Sample)
- **PAKT Platform**: [https://www.pakt.world](https://www.pakt.world)
- **Issues**:
  [https://github.com/pakt-world/PaktSDK/issues](https://github.com/pakt-world/PaktSDK/issues)

---

## License

BSD-3-Clause © PAKT

================================================ FILE: jest.config.js
================================================ module.exports = { roots:
['<rootDir>/src'], testMatch: [ '**/__tests__/**/*.+(ts|tsx|js)',
'**/?(*.)+(spec|test).+(ts|tsx|js)' ], transform: { '^.+\\.(ts|tsx)$': 'ts-jest'
}, testTimeout: 30000, setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'] }

================================================ FILE: jest.setup.ts
================================================ import 'reflect-metadata'
import dotenv from 'dotenv'; import { fetch, Headers } from 'undici';

// @ts-ignore global.fetch = fetch // @ts-ignore global.Headers = Headers

dotenv.config({ path: './.env' });

================================================ FILE: LICENSE
================================================ BSD 3-Clause License

Copyright (c) 2023, Pakt World Inc

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors
   may be used to endorse or promote products derived from this software without
   specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

================================================ FILE: package.json
================================================ { "name": "pakt-sdk",
"version": "0.1.46-beta", "description": "The PAKT SDK is an advanced software
development kit, purpose-built for web applications, that empowers developers to
construct innovative products on the PAKT Operating System.", "files": [
"./dist/main.js", "./dist/main.d.ts" ], "exports": { ".": "./dist/main.js",
"./main.d.ts": "./dist/main.d.ts" }, "main": "./dist/main.js", "types":
"./dist/main.d.ts", "private": false, "scripts": { "test": "echo \"Error: no
test specified\" && exit 1", "dev": "npx ts-node ./examples/src/index.ts",
"format": "prettier --write \"src/**/\*.ts\" \"src/**/\*.js\"", "lint": "tslint
-p tsconfig.json", "build": "rimraf ./dist && tsup", "server": "node
build/usage/registration.js", "sd": "tsc --experimentalDecorators
--resolveJsonModule ./src/services/index.ts" }, "repository": { "type": "git",
"url": "git+https://github.com/pakt-world/PaktSDK.git" }, "keywords": [ "pakt",
"pakt-api", "pakt-sdk" ], "author": { "name": "PAKT", "email":
"joshuaa@pakt.com" }, "license": "BSD-3", "bugs": { "url":
"https://github.com/pakt-world/PaktSDK/issues" }, "homepage":
"https://github.com/pakt-world/PaktSDK#readme", "devDependencies": {
"@types/jest": "^27.4.1", "@types/node": "^18.15.11", "@types/node-fetch":
"^2.6.3", "@types/uuid": "^9.0.1", "@typescript-eslint/eslint-plugin":
"^5.43.0", "@typescript-eslint/parser": "^5.20.0", "dotenv": "^16.0.3",
"eslint": "^8.0.1", "eslint-config-standard-with-typescript": "^34.0.1",
"eslint-plugin-import": "^2.25.2", "eslint-plugin-n": "^15.0.0",
"eslint-plugin-promise": "^6.0.0", "prettier": "^2.8.8", "ts-node": "^10.7.0",
"tslint": "^6.1.3", "tslint-config-prettier": "^1.18.0", "tsup": "^7.1.0",
"typescript": "^4.9.5", "typescript-transform-paths": "^3.4.6", "undici":
"^5.21.0" }, "dependencies": { "node-fetch": "^2.6.6", "reflect-metadata":
"^0.1.13", "typedi": "^0.10.0" } }

================================================ FILE: tsconfig.json
================================================ { "compilerOptions": {
"target": "es2016" /_ Set the JavaScript language version for emitted JavaScript
and include compatible library declarations. _/, "lib": [ "es6" ] /_ Specify a
set of bundled library declaration files that describe the target runtime
environment. _/, "module": "commonjs" /_ Specify what module code is generated.
_/, "baseUrl": "./", "outDir": "./dist", "rootDir": "./", "sourceMap": true,
"noFallthroughCasesInSwitch": true, "noUnusedParameters": true /_ Report errors
on unused parameters. _/, "noImplicitReturns": true, "resolveJsonModule": true
/_ Enable importing .json files. _/, "allowJs": true /_ Allow JavaScript files
to be a part of your program. Use the 'checkJS' option to get errors from these
files. _/, "esModuleInterop": true /_ Emit additional JavaScript to ease support
for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for
type compatibility. _/, "forceConsistentCasingInFileNames": true /_ Ensure that
casing is correct in imports. _/, "strict": true /_ Enable all strict
type-checking options. _/, "noImplicitAny": true /_ Enable error reporting for
expressions and declarations with an implied 'any' type. _/, "skipLibCheck":
true /_ Skip type checking all .d.ts files. _/, "declaration": false,
"typeRoots": ["node_modules/@types", "./src/types", "./types.d.ts"],
"experimentalDecorators": true, "emitDecoratorMetadata": true }, "plugins": [ {
"transform": "typescript-transform-paths" }, { "transform":
"typescript-transform-paths", "afterDeclarations": true } ], "ts-node": {
"transpileOnly": true, "require": ["typescript-transform-paths/register"] },
"include": ["src/**/*"], "exclude": ["node_modules", "build/**/*", "tests/**/*"]
}

================================================ FILE: tslint.json
================================================ { "extends":
["tslint:recommended", "tslint-config-prettier"] }

================================================ FILE: tsup.config.ts
================================================ import { Options, defineConfig
} from "tsup";

export default defineConfig((options: Options) => ({ treeshake: true, splitting:
true, entry: ["src/main.ts"], // format: ["esm"], dts: true, minify: true,
...options, }));

================================================ FILE: .eslintrc.yml
================================================ env: browser: true es2021: true
extends: standard-with-typescript overrides: [] parserOptions: ecmaVersion:
latest sourceType: module rules: {}

================================================ FILE: .npmignore
================================================

# Dependency directories

node_modules/

#dist

examples/

./PAKT_SDK.png

.vscode

================================================ FILE: .prettierrc
================================================ { "printWidth": 120,
"trailingComma": "all", "singleQuote": false,
"organizeImportsSkipDestructiveCodeActions": true }

================================================ FILE: examples/src/auth.ts
================================================ import { LoginPayload,
RegisterPayload } from "../../src/services"; import PaktSDKInit from "./helper";

// call login function with pakt sdk const Login = async () => { try { const sdk
= await PaktSDKInit(); // test payload for login const loginDetails:
LoginPayload = { email: "test@email.com", password: "12345678", }; const
loginData = await sdk.auth.login(loginDetails); console.log(loginData); } catch
(error) { // handle error response here.... console.log(error); } };

// call register function with pakt sdk const Register = async () => { try {
const sdk = await PaktSDKInit(); // test payload for registration const payload:
RegisterPayload = { firstName: "John", lastName: "Tunde", email:
"test@email.com", password: "12345678", confirmPassword: "12345678", }; const
loginData = await sdk.auth.register(payload); console.log(loginData); } catch
(error) { // handle error response here.... console.log(error); } };

export { Login, Register };

================================================ FILE:
examples/src/collection.ts ================================================
import { CreateCollectionDto, CreateManyCollectionDto } from
"../../src/services/collection/collection.dto"; import PaktSDKInit from
"./helper";

// How to create a new collection const CreateCollection = async (authToken:
string) => { try { const sdk = await PaktSDKInit(); // test payload for login
const collectionPayload: CreateCollectionDto = { name: "New collection title",
description: "I send a New Post to Jacob", isPrivate: false, type: "job", };
const collection = await sdk.collection.create(authToken, collectionPayload);
console.log({ collection }); } catch (error) { // handle error response here....
console.log(error); } };

const createCollections = async (authToken: string) => { try { const sdk = await
PaktSDKInit(); const collectionList: CreateCollectionDto[] = [ { name: "New
collection title", description: "I send a New Post to Jacob", isPrivate: false,
type: "connection", }, { name: "Collection Configuration", description:
"Configure your collections with different types, mark the type in creating the
collection", isPrivate: false, type: "connection", }, ]; const manyCollections:
CreateManyCollectionDto = { type: "connection", parent: "job", collections:
collectionList, }; const collections = await
sdk.collection.createMany(authToken, manyCollections); console.log({ collections
}); } catch (error) { // handle error response here.... console.log(error); } };

// create new collection type // const CreateCollectionType = async () => { //
try { // const sdk = await PaktSDKInit(); // // test payload for login // const
collectionPayload: CreateCo = { // name: "New collection title", // description:
"I send a New Post to Jacob", // isPrivate: false, // type: "job" // }; // const
loginData = await sdk.collection.createType(collectionPayload); //
console.log(loginData); // } catch (error) { // // handle error response
here.... // console.log(error); // } // }

export { CreateCollection, createCollections };

================================================ FILE: examples/src/helper.ts
================================================ import PaktSDK from
"../../src/services"; import { PaktConfig } from "../../src/utils/config";

const baseUrl = "http://localhost:9090";

// Test SDK initalization const PaktSDKInit = () => { const configData:
PaktConfig = { baseUrl, verbose: true, }; return PaktSDK.init(configData); };

export default PaktSDKInit;

================================================ FILE: examples/src/index.ts
================================================ import { Login } from "./auth";

const run = async () => { const responseLogin = await Login();
console.log(responseLogin); };

run();

================================================ FILE: src/main.ts
================================================ import "reflect-metadata";
export _ from "./services"; export _ from "./utils";

================================================ FILE:
src/connector/connector.dto.ts ================================================
export interface GetUrl { path?: string; params?: { [key: string]: string |
number | boolean | undefined }; authToken?: string; }

export interface PostRequest extends GetUrl { body?: object | object[]; method?:
string; }

================================================ FILE:
src/connector/connector.ts ================================================
import { Headers, RequestInfo, RequestInit } from "node-fetch"; import {
Container, Service } from "typedi"; import { version } from
"../../package.json"; import { API_PATHS } from "../utils"; import { PAKT_CONFIG
} from "../utils/token"; import { GetUrl, PostRequest } from "./connector.dto";
const fetch = (url: RequestInfo, init?: RequestInit) =>
import("node-fetch").then(({ default: fetch }) => fetch(url, init));

@Service({ factory: (data: { id: string }) => { return new
PaktConnector(data.id); }, transient: true, }) export class PaktConnector {
constructor(private readonly id: string) {}

public async get<T>(request: GetUrl) { return this.request<T>({ ...request,
method: "GET" }); }

public async post<T>(request: PostRequest) { return this.request<T>({
...request, method: "POST" }); }

public async patch<T>(request: PostRequest) { return this.request<T>({
...request, method: "PATCH" }); }

public async put<T>(request: PostRequest) { return this.request<T>({ ...request,
method: "PUT" }); }

public async delete<T>(request: GetUrl) { return this.request<T>({ ...request,
method: "DELETE" }); }

private async request<T>( { path, params, body, method, authToken }:
PostRequest, retry = 0, externalUrl?: string, ): Promise<T> { const { verbose }
= Container.of(this.id).get(PAKT_CONFIG);

    const url = externalUrl || this.getUrl({ path, params });
    const headers = await this.headers(retry, authToken);
    const bodypayload = body ? { body: JSON.stringify(body) } : {};
    const request: RequestInit = {
      headers,
      method,
      ...bodypayload,
    };

    const start = Date.now();
    if (verbose) {
      console.debug(new Date().toISOString(), "SDK Request: ", request.method, url, request.body);
    }
    try {
      return await fetch(url, request).then(async (res) => {
        const end = Date.now() - start;
        if (verbose) {
          console.log(
            new Date().toISOString(),
            `SDK Response received in ${end}ms: `,
            res.status,
            await res.clone().text(),
          );
        }
        const response = await res.json();
        return { ...response, code: res.status };
      });
    } catch (error) {
      if (verbose) {
        console.warn(new Date().toISOString(), "Error: ", error);
      }
      return Promise.reject(error);
    }

}

private getUrl({ path, params }: GetUrl) { const config =
Container.of(this.id).get(PAKT_CONFIG); const realPath = API_PATHS.API_VERSION +
path; const url = new URL(realPath || "", config.baseUrl); console.log(realPath,
url);

    if (params) {
      Object.keys(params)
        .filter((key) => !!params[key])
        .forEach((key) => url.searchParams.append(key, `${params[key]}`));
    }

    if (config.testnet) {
      url.searchParams.append("type", "testnet");
    }

    return url.toString();

}

private async headers(retry: number, authToken?: string) { let authHeader = {};
const config = Container.of(this.id).get(PAKT_CONFIG); //const authToken =
Container.of(this.id).get(AUTH_TOKEN); if (authToken) { authHeader = {
Authorization: `Bearer ${authToken}`, }; } const headers = new Headers({
"Content-Type": "application/json", "x-pkt-sdk-version": version,
"x-pkt-sdk-product": "JS", "x-pkt-testnet": `${config.testnet}`,
"x-pkt-sdk-retry": `${retry}`, ...authHeader, }); return headers; } }

================================================ FILE: src/connector/index.ts
================================================ export \* from "./connector";

================================================ FILE: src/services/index.ts
================================================ import { Container, Service }
from "typedi"; import { PaktConfig } from "../utils/config"; import { CHARACTERS
} from "../utils/constants"; import { AUTH_TOKEN, PAKT_CONFIG, TEMP_TOKEN } from
"../utils/token"; import { AccountModule, AccountModuleType } from
"./account/account"; import { AuthenticationModule, AuthenticationModuleType }
from "./auth"; import { BookMarkModule, BookMarkModuleType } from "./bookmark";
import { ChatModule, ChatModuleType } from "./chat"; import { CollectionModule,
CollectionModuleType } from "./collection/collection"; import {
ConnectionFilterModule } from "./connectionFilter"; import {
ConnectionFilterModuleType } from "./connectionFilter/connectionFilter.dto";
import { FeedModule } from "./feed"; import { FeedModuleType } from
"./feed/feed.dto"; import { InviteModule, InviteModuleType } from "./invite";
import { NotificationModule, NotificationModuleType } from "./notification";
import { PaymentModule, PaymentModuleType } from "./payment"; import {
ReviewModule, ReviewModuleType } from "./review"; import { UploadModule,
UploadModuleType } from "./upload/upload"; import { UserVerificationModule,
UserVerificationModuleType } from "./userVerification"; import { WalletModule,
WalletModuleType } from "./wallet/wallet"; import { WithdrawalModule } from
"./withdrawal/withdrawal"; import { WithdrawalModuleType } from
"./withdrawal/withdrawal.dto"; import { DirectDepositModuleType } from
"./direct-deposit/direct-deposit.dto"; import { DirectDepositModule } from
"./direct-deposit";

export _ from "./account"; export _ from "./auth"; export _ from "./bookmark";
export _ from "./chat"; export _ from "./collection"; export _ from
"./connectionFilter"; export _ from "./feed"; export _ from "./invite"; export _
from "./notification"; export _ from "./payment"; export _ from "./review";
export _ from "./upload"; export _ from "./userVerification"; export _ from
"./wallet"; export \* from "./withdrawal";

@Service({ transient: true }) export class PaktSDK { auth:
AuthenticationModuleType; bookmark: BookMarkModuleType; collection:
CollectionModuleType; account: AccountModuleType; notifications:
NotificationModuleType; file: UploadModuleType; wallet: WalletModuleType;
withdrawal: WithdrawalModuleType; review: ReviewModuleType; userVerification:
UserVerificationModuleType; chat: ChatModuleType; connectionFilter:
ConnectionFilterModuleType; invite: InviteModuleType; feed: FeedModuleType;
payment: PaymentModuleType; directDeposit: DirectDepositModuleType;

constructor(id: string) { this.auth =
Container.of(id).get(AuthenticationModule); this.collection =
Container.of(id).get(CollectionModule); this.account =
Container.of(id).get(AccountModule); this.notifications =
Container.of(id).get(NotificationModule); this.file =
Container.of(id).get(UploadModule); this.wallet =
Container.of(id).get(WalletModule); this.withdrawal =
Container.of(id).get(WithdrawalModule); this.review =
Container.of(id).get(ReviewModule); this.bookmark =
Container.of(id).get(BookMarkModule); this.userVerification =
Container.of(id).get(UserVerificationModule); this.chat =
Container.of(id).get(ChatModule); this.connectionFilter =
Container.of(id).get(ConnectionFilterModule); this.invite =
Container.of(id).get(InviteModule); this.feed =
Container.of(id).get(FeedModule); this.payment =
Container.of(id).get(PaymentModule); this.directDeposit =
Container.of(id).get(DirectDepositModule); } /\*\*

- Initialize Pakt SDK. This method must be called before any other method.
- Default configuration is used if no configuration is provided.
- @param config \*/ public static async init(config: PaktConfig):
  Promise<PaktSDK> { const defaultConfig: PaktConfig = { ...config, };


    const id = PaktSDK.generateRandomString();
    Container.of(id).set(PAKT_CONFIG, defaultConfig);
    Container.of(id).set(AUTH_TOKEN, "");
    Container.of(id).set(TEMP_TOKEN, "");
    return new PaktSDK(id);

} /\*\*

- Generate Random String. This method is used to generate random strings.
- @param config _/ private static generateRandomString() { const characters =
  CHARACTERS; let result = ""; for (let i = 0; i < 60; i++) { result +=
  characters.charAt(Math.floor(Math.random() _ characters.length)); } return
  result; } }

export default PaktSDK;

================================================ FILE:
src/services/account/account.dto.ts
================================================ import { ResponseDto } from
"../../utils/response"; import { IUser } from "../auth";

export type fetchAccountDto = {} & IUser;

export interface updateUserDto { profileImage?: string; bgImage?: string;
profile?: { contact?: { country?: string; state?: string; city?: string;
address?: string; phone?: string; }; bio?: { title?: string; description?:
string; }; talent?: { about?: string; availability?: "busy" | "available" |
"working"; tags?: string[]; tagsIds?: string | any[]; tagsCategory?: string; };
}; isPrivate?: boolean; socials?: { github?: string; twitter?: string;
linkedin?: string; website?: string; }; meta?: Record<string, any>; }

export type TwoFATypeDto = "google_auth" | "email";

export type TwoFAresponse = { type: TwoFATypeDto; qrCodeUrl?: string;
tempToken?: { token: string; expiresIn: number; }; };

export interface FilterUserDto { sort?: "score" | string; search?: string;
tags?: string[]; range?: number[]; type?: "recipient" | "creator"; owner?:
boolean; profileCompletenessMin?: number; profileCompletenessMax?: number;
page?: number; limit?: number; }

export interface FindUsers { pages: number; page: number; total: number; limit:
number; data: Record<string, any>[] | IUser[]; }

export interface AccountModuleType { getUser(authToken: string):
Promise<ResponseDto<fetchAccountDto>>; onboardEndpoint( tagCategory: string,
profileImage: string, type: string, authToken: string, ):
Promise<ResponseDto<fetchAccountDto>>; updateAccount(payload: updateUserDto,
authToken: string): Promise<ResponseDto<fetchAccountDto>>;
changePassword(oldPassword: string, newPassword: string, authToken: string):
Promise<ResponseDto<fetchAccountDto>>; initate2FA(type: TwoFATypeDto, authToken:
string): Promise<ResponseDto<TwoFAresponse>>; activate2FA(code: string,
authToken: string): Promise<ResponseDto<void>>; deactivate2FA(code: string,
authToken: string): Promise<ResponseDto<void>>; sendEmailTwoFA(authToken:
string): Promise<ResponseDto<{}>>; getAUser(id: string, authToken: string):
Promise<ResponseDto<fetchAccountDto>>; getUsers(authToken: string, filter?:
FilterUserDto): Promise<ResponseDto<FindUsers>>; logout(authToken: string):
Promise<ResponseDto<void>>; }

================================================ FILE:
src/services/account/account.ts ================================================
import { Container, Service } from "typedi"; import { PaktConnector } from
"../../connector"; import { API_PATHS } from "../../utils/constants"; import {
ErrorUtils, ResponseDto, Status, parseUrlWithQuery } from
"../../utils/response"; import { AccountModuleType, FilterUserDto, FindUsers,
TwoFATypeDto, TwoFAresponse, fetchAccountDto, updateUserDto, } from
"./account.dto";

// Export all Types to Service export \* from "./account.dto";

@Service({ factory: (data: { id: string }) => { return new
AccountModule(data.id); }, transient: true, }) export class AccountModule
implements AccountModuleType { private id: string; private connector:
PaktConnector; constructor(id: string) { this.id = id; this.connector =
Container.of(this.id).get(PaktConnector); }

/\*\*

- getUser. \*/ async getUser(authToken: string):
  Promise<ResponseDto<fetchAccountDto>> { return ErrorUtils.newTryFail(async ()
  => { const response: ResponseDto<fetchAccountDto> = await this.connector.get({
  path: API_PATHS.ACCOUNT, authToken }); if (Number(response.statusCode ||
  response.code) > 226 || response.status === Status.ERROR) return response;
  return response; }); }

/\*\*

- onboardEndpoint.
- @param skillCategory string
- @param profileImage string
- @param type string \*/ async onboardEndpoint( skillCategory: string,
  profileImage: string, type: string, authToken: string, ):
  Promise<ResponseDto<fetchAccountDto>> { return ErrorUtils.newTryFail(async ()
  => { const body = { skillCategory, profileImage, type }; const response:
  ResponseDto<fetchAccountDto> = await this.connector.post({ path:
  API_PATHS.ACCOUNT_ONBOARD, body, authToken, }); if (Number(response.statusCode
  || response.code) > 226 || response.status === Status.ERROR) return response;
  return response; }); }

/\*\*

- onboardEndpoint.
- @param skillCategory string
- @param profileImage string
- @param type string \*/ async updateAccount(payload: updateUserDto, authToken:
  string): Promise<ResponseDto<fetchAccountDto>> { return
  ErrorUtils.newTryFail(async () => { const body = { ...payload }; const
  response: ResponseDto<fetchAccountDto> = await this.connector.patch({ path:
  API_PATHS.ACCOUNT_UPDATE, body: payload, authToken, }); if
  (Number(response.statusCode || response.code) > 226 || response.status ===
  Status.ERROR) return response; return response; }); }

/\*\*

- change Password.
- @param oldPassword string
- @param newPassword string \*/ async changePassword( oldPassword: string,
  newPassword: string, authToken: string, ):
  Promise<ResponseDto<fetchAccountDto>> { return ErrorUtils.newTryFail(async ()
  => { const body = { oldPassword, newPassword }; const response:
  ResponseDto<fetchAccountDto> = await this.connector.put({ path:
  API_PATHS.ACCOUNT_PASSWORD, body, authToken, }); if
  (Number(response.statusCode || response.code) > 226 || response.status ===
  Status.ERROR) return response; return response; }); }

/\*\*

- initate2FA.
- @param type TwoFATypeDto \*/ async initate2FA(type: TwoFATypeDto, authToken:
  string): Promise<ResponseDto<TwoFAresponse>> { return
  ErrorUtils.newTryFail(async () => { const body = { type }; const response:
  ResponseDto<TwoFAresponse> = await this.connector.post({ path:
  API_PATHS.ACCOUNT_PASSWORD, body, authToken, }); if
  (Number(response.statusCode || response.code) > 226 || response.status ===
  Status.ERROR) return response; return response; }); }

/\*\*

- active2FA.
- @param code string \*/ async activate2FA(code: string, authToken: string):
  Promise<ResponseDto<void>> { return ErrorUtils.newTryFail(async () => { const
  body = { code }; const response: ResponseDto<void> = await
  this.connector.post({ path: API_PATHS.ACCOUNT_TWO_ACTIVATE, body, authToken,
  }); if (Number(response.statusCode || response.code) > 226 || response.status
  === Status.ERROR) return response; return response; }); }

/\*\*

- active2FA.
- @param code string \*/ async deactivate2FA(code: string, authToken: string):
  Promise<ResponseDto<void>> { return ErrorUtils.newTryFail(async () => { const
  body = { code }; const response: ResponseDto<void> = await
  this.connector.post({ path: API_PATHS.ACCOUNT_TWO_DEACTIVATE, body, authToken,
  }); if (Number(response.statusCode || response.code) > 226 || response.status
  === Status.ERROR) return response; return response; }); }

async sendEmailTwoFA(authToken: string): Promise<ResponseDto<{}>> { return
ErrorUtils.newTryFail(async () => { const response: ResponseDto<{}> = await
this.connector.post({ path: API_PATHS.ACCOUNT_SEND_EMAIL_TWO_FA, authToken, });
if (Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); }

async getAUser(id: string, authToken: string):
Promise<ResponseDto<fetchAccountDto>> { return ErrorUtils.newTryFail(async () =>
{ const response: ResponseDto<fetchAccountDto> = await this.connector.get({
path: `${API_PATHS.ACCOUNT_FETCH_SINGLE}${id}`, authToken, }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); } async getUsers(authToken:
string, filter?: FilterUserDto | undefined): Promise<ResponseDto<FindUsers>> {
if (filter) { const query = parseUrlWithQuery(API_PATHS.ACCOUNT_FETCH_ALL, {
...filter }); return ErrorUtils.newTryFail(async () => { const response:
ResponseDto<FindUsers> = await this.connector.get({ path: query, authToken });
if (Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); } return
ErrorUtils.newTryFail(async () => { const response: ResponseDto<FindUsers> =
await this.connector.get({ path: API_PATHS.ACCOUNT_FETCH_ALL }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); }

/\*\*

- Logout. \*/ async logout(authToken: string): Promise<ResponseDto<void>> {
  return ErrorUtils.newTryFail(async () => { const response: ResponseDto<void> =
  await this.connector.post({ path: API_PATHS.ACCOUNT_LOGOUT, authToken });
  return response; }); } }

================================================ FILE:
src/services/account/index.ts ================================================
export \* from "./account";

================================================ FILE:
src/services/auth/auth.dto.ts ================================================
import { ResponseDto } from "../../utils/response"; import { IChatConversation }
from "../chat/chat.dto";

export type IUserTwoFaType = "email" | "google_auth" | "security_answer";

export interface IUser { \_id: string; type: string; email: string; lastName:
string; firstName: string; score: number; profileCompleteness: number;
profileImage?: { \_id?: string; type?: string; size?: string; url: string; };
bgImage?: { \_id?: string; type?: string; size?: string; url: string; };
profile: { contact?: { city?: string; state?: string; phone?: string; address?:
string; country?: string; }; bio?: { title?: string; description?: string; };
talent: { availability: "busy" | "available" | "working"; tags: string[];
tagsIds: any[]; tagsCategory: string; about?: string; }; }; isPrivate?: boolean;
socket?: { id: string; status: "ONLINE" | "AWAY" | "OFFLINE"; conversation:
IChatConversation; }; twoFa?: { status: boolean; type: IUserTwoFaType;
securityQuestion?: string; }; meta?: Record<string, any>; isBookmarked?:
boolean; bookmarkId?: string; createdAt?: string | Date; deletedAt?: string |
Date; updatedAt?: string | Date; }

export type LoginDto = { email: string; token: string; onboarded: boolean;
isVerified: boolean; tempToken: { token: string; expiresIn: number; }; } &
IUser;

export interface RegisterDto { token: string; token_type: string; expiresIn:
number; }

export interface IRegisterResponse { tempToken: { token: string; token_type:
string; expiresIn: number; }; }

export interface RegisterPayload { firstName: string; lastName?: string; email:
string; password: string; confirmPassword: string; referral?: string; type?:
string; }

export interface VerifyAccountPayload { tempToken: string; token: string; }

export interface LoginPayload { email: string; password: string; }

export interface ChangeAuthenticationPasswordPayload { token: string; tempToken:
string; password: string; }

export interface ResendVerifyPayload { email: string; }

export interface ResetPasswordPayload { email: string; }

export type AccountVerifyDto = { token: string; code: string; expiresIn: number;
} & IUser;

export interface IResendVerifyLink { tempToken: { token: string; expiresIn:
number; token_type: string; }; } export type ResetDto = { tempToken: { token:
string; expiresIn: number; token_type: string; }; }; export type ResendVerifyDto
= void; export type ChangePasswordDto = void; export type ValidatePasswordToken
= void;

export type ValidateReferralDto = { valid: boolean; userId: string;
referralCounts: number; totalAllowedReferrals: number; referralId: string; role:
string; isKyc: boolean; };

export interface GoogleOAuthGenerateDto { googleAuthUrl: string; state: string;
}

export interface GoogleOAuthValdatePayload { state: string; code: string; }

export interface GoogleOAuthValidateDto { token: string; token_type: string;
expiresIn: number; isVerified: boolean; timeZone: string | undefined; type:
"sign_in" | "sign_up"; }

export interface AuthenticationModuleType { login(payload: LoginPayload):
Promise<ResponseDto<LoginDto>>; register(payload: RegisterPayload):
Promise<ResponseDto<RegisterDto>>; verifyAccount(payload: VerifyAccountPayload):
Promise<ResponseDto<AccountVerifyDto>>; resendVerifyLink(payload:
ResendVerifyPayload): Promise<ResponseDto<IResendVerifyLink>>;
resetPassword(payload: ResetPasswordPayload): Promise<ResponseDto<ResetDto>>;
changePassword(payload: ChangeAuthenticationPasswordPayload):
Promise<ResponseDto<ChangePasswordDto>>; validatePasswordToken(props: { token:
string; tempToken: string }): Promise<ResponseDto<ValidatePasswordToken>>;
validateReferral(token: string): Promise<ResponseDto<ValidateReferralDto>>;
googleOAuthGenerateState(): Promise<ResponseDto<GoogleOAuthGenerateDto>>;
googleOAuthValidateState(props: GoogleOAuthValdatePayload):
Promise<ResponseDto<GoogleOAuthValidateDto>>; }

================================================ FILE: src/services/auth/auth.ts
================================================ import { Container, Service }
from "typedi"; import { PaktConnector } from "../../connector"; import {
API_PATHS } from "../../utils/constants"; import { ErrorUtils,
parseUrlWithQuery, ResponseDto, Status } from "../../utils/response"; import {
AUTH_TOKEN, TEMP_TOKEN } from "../../utils/token"; import { AccountVerifyDto,
AuthenticationModuleType, ChangeAuthenticationPasswordPayload,
ChangePasswordDto, GoogleOAuthGenerateDto, GoogleOAuthValdatePayload,
GoogleOAuthValidateDto, IRegisterResponse, IResendVerifyLink, LoginDto,
LoginPayload, RegisterDto, RegisterPayload, ResendVerifyPayload, ResetDto,
ResetPasswordPayload, ValidatePasswordToken, ValidateReferralDto,
VerifyAccountPayload, } from "./auth.dto";

// Export all Types to Service export \* from "./auth.dto";

@Service({ factory: (data: { id: string }) => { return new
AuthenticationModule(data.id); }, transient: true, }) export class
AuthenticationModule implements AuthenticationModuleType { private id: string;
private connector: PaktConnector; constructor(id: string) { this.id = id;
this.connector = Container.of(this.id).get(PaktConnector); }

/\*\*

- login. This method authenticates a user.
- @param email
- @param password \*/ async login(payload: LoginPayload):
  Promise<ResponseDto<LoginDto>> { return ErrorUtils.newTryFail(async () => {
  const response: ResponseDto<LoginDto> = await this.connector.post({ path:
  API_PATHS.LOGIN, body: payload }); if (Number(response.statusCode ||
  response.code) > 226 || response.status === Status.ERROR) return response; if
  (response.data.tempToken) { Container.of(this.id).set(TEMP_TOKEN,
  response.data.tempToken.token); } else { Container.of(this.id).set(AUTH_TOKEN,
  response.data.token); } return response; }); }

/\*\*

- register. This method creates a new user account.
- @param firstName
- @param lastName
- @param email
- @param password \*/ async register(payload: RegisterPayload):
  Promise<ResponseDto<RegisterDto>> { return ErrorUtils.newTryFail(async () => {
  const credentials = { ...payload }; const response:
  ResponseDto<IRegisterResponse> = await this.connector.post({ path:
  API_PATHS.REGISTER, body: credentials, }); if (Number(response.statusCode ||
  response.code) > 226 || response.status === Status.ERROR) return response as
  unknown as ResponseDto<RegisterDto>; if (response.data?.tempToken.token) {
  Container.of(this.id).set(TEMP_TOKEN, response.data.tempToken.token); } return
  { ...response, data: { token: response.data.tempToken.token, token_type:
  response.data.tempToken.token_type, expiresIn:
  response.data.tempToken.expiresIn, }, }; }); }

/\*\*

- verifyAccount. This method verifies a new user account
- @param tempToken
- @param token \*/ async verifyAccount(payload: VerifyAccountPayload):
  Promise<ResponseDto<AccountVerifyDto>> { const { tempToken, token } = payload;
  return ErrorUtils.newTryFail(async () => { const credentials = { tempToken,
  token }; const response: ResponseDto<AccountVerifyDto> = await
  this.connector.post({ path: API_PATHS.ACCOUNT_VERIFY, body: credentials, });
  if (Number(response.statusCode || response.code) > 226 || response.status ===
  Status.ERROR) return response;

        Container.of(this.id).set(AUTH_TOKEN, response.data.token);

        return { ...response, data: { ...response.data, code: response.data.token } };

    }); }

/\*\*

- resetPassword. This method sends an email for account password reset
- @param email \*/ async resendVerifyLink(payload: ResendVerifyPayload):
  Promise<ResponseDto<IResendVerifyLink>> { return ErrorUtils.newTryFail(async
  () => { const response: ResponseDto<ResetDto> = await this.connector.post({
  path: API_PATHS.RESEND_VERIFY_LINK, body: payload, }); if
  (Number(response.statusCode || response.code) > 226 || response.status ===
  Status.ERROR) return response;

        if (response.data.tempToken) {
          Container.of(this.id).set(TEMP_TOKEN, response.data.tempToken.token);
        }
        return response;

    }); }

/\*\*

- resetPassword. This method sends an email for account password reset
- @param email \*/ async resetPassword(payload: ResetPasswordPayload):
  Promise<ResponseDto<ResetDto>> { return ErrorUtils.newTryFail(async () => {
  const response: ResponseDto<ResetDto> = await this.connector.post({ path:
  API_PATHS.RESET_PASSWORD, body: payload, }); if (Number(response.statusCode ||
  response.code) > 226 || response.status === Status.ERROR) return response;
  return response; }); }

/\*\*

- changePassword. This method changes account password
- @param token
- @param password \*/ async changePassword(payload:
  ChangeAuthenticationPasswordPayload): Promise<ResponseDto<ChangePasswordDto>>
  { return ErrorUtils.newTryFail(async () => { const response:
  ResponseDto<ChangePasswordDto> = await this.connector.post({ path:
  API_PATHS.CHANGE_PASSWORD, body: payload, }); if (Number(response.statusCode
  || response.code) > 226 || response.status === Status.ERROR) return response;
  return response; }); }

async validatePasswordToken(props: { token: string; tempToken: string; }):
Promise<ResponseDto<ValidatePasswordToken>> { return ErrorUtils.newTryFail(async
() => { const { token, tempToken } = props; const response:
ResponseDto<ChangePasswordDto> = await this.connector.post({ path:
`${API_PATHS.VALIDATE_PASSWORD_TOKEN}`, body: { tempToken, token }, }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); }

async validateReferral(token: string): Promise<ResponseDto<ValidateReferralDto>>
{ return ErrorUtils.newTryFail(async () => { const credentials = { token };
const response: ResponseDto<ValidateReferralDto> = await this.connector.post({
path: `${API_PATHS.VALIDATE_REFERRAL}`, body: credentials, }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); }

async googleOAuthGenerateState(): Promise<ResponseDto<GoogleOAuthGenerateDto>> {
return ErrorUtils.newTryFail(async () => { const response:
ResponseDto<GoogleOAuthGenerateDto> = await this.connector.get({ path:
`${API_PATHS.GOOGLE_OAUTH_GENERATE_STATE}`, }); if (Number(response.statusCode
|| response.code) > 226 || response.status === Status.ERROR) return response;
return response; }); } googleOAuthValidateState(props:
GoogleOAuthValdatePayload): Promise<ResponseDto<GoogleOAuthValidateDto>> {
return ErrorUtils.newTryFail(async () => { const { state, code } = props; const
query = parseUrlWithQuery(API_PATHS.GOOGLE_OAUTH_VALIDATE_STATE, { state, code
}); const response: ResponseDto<GoogleOAuthValidateDto> = await
this.connector.post({ path: query, }); if (Number(response.statusCode ||
response.code) > 226 || response.status === Status.ERROR) return response;
return response; }); } }

================================================ FILE:
src/services/auth/index.ts ================================================
export \* from "./auth";

================================================ FILE:
src/services/bookmark/bookmark.dto.ts
================================================ import { ResponseDto } from
"../../utils/response"; import { IUser } from "../auth"; import { ICollectionDto
} from "../collection/collection.dto"; import { IFeed } from "../feed"; import {
IInviteDto } from "../invite";

export interface ICollectionBookmarkDto { \_id?: string; owner?: IUser | string;
data?: ICollectionDto | string; feed?: IFeed; invite?: IInviteDto; user?: IUser;
type?: BookmarkType; active?: boolean; isDeleted?: boolean; createdAt?: string |
Date; deletedAt?: string | Date; updatedAt?: string | Date; } export type
FindCollectionBookMarkDto = { page: number; pages: number; total: number; limit:
number; data: ICollectionBookmarkDto[]; };

export type createBookMarkDto = { reference: string; type: BookmarkType; };

export type filterBookmarkDto = | { page?: string; limit?: string; } |
ICollectionBookmarkDto | Record<string, any>;

export enum BookmarkEnumType { FEED = "feed", COLLECTION = "collection", INVITE
= "invite", USER = "user", }

export type BookmarkType = "feed" | "collection" | "invite" | "user";

export interface BookMarkModuleType { getAll(authToken: string, filter?:
filterBookmarkDto): Promise<ResponseDto<FindCollectionBookMarkDto>>; getById(
authToken: string, id: string, filter?: Record<string, any> |
ICollectionBookmarkDto, ): Promise<ResponseDto<ICollectionBookmarkDto>>;
create(authToken: string, payload: createBookMarkDto):
Promise<ResponseDto<ICollectionBookmarkDto>>; delete(authToken: string, id:
string): Promise<ResponseDto<any>>; }

================================================ FILE:
src/services/bookmark/bookmark.ts
================================================ import { Container, Service }
from "typedi"; import { PaktConnector } from "../../connector"; import {
API_PATHS } from "../../utils/constants"; import { ErrorUtils, ResponseDto,
Status, parseUrlWithQuery } from "../../utils/response"; import {
FindCollectionBookMarkDto, ICollectionBookmarkDto, createBookMarkDto,
filterBookmarkDto, } from "./bookmark.dto";

// Export all Types to Service export \* from "./bookmark.dto";

@Service({ factory: (data: { id: string }) => { return new
BookMarkModule(data.id); }, transient: true, }) export class BookMarkModule {
private id: string; private connector: PaktConnector; constructor(id: string) {
this.id = id; this.connector = Container.of(this.id).get(PaktConnector); }

/\*\*

- findall. This method finds all logged User's Bookmark collections.
- @param filter filterBookmarkDto \*/ async getAll(authToken: string, filter?:
  filterBookmarkDto): Promise<ResponseDto<FindCollectionBookMarkDto>> { return
  ErrorUtils.newTryFail(async () => { const fetchUrl =
  parseUrlWithQuery(API_PATHS.BOOKMARK, filter); const response:
  ResponseDto<FindCollectionBookMarkDto> = await this.connector.get({ path:
  fetchUrl, authToken }); if (Number(response.statusCode || response.code) > 226
  || response.status === Status.ERROR) return response; return response; }); }

/\*\*

- findall. This method finds bookmarked collection by id.
- @param filter Record<string, any> | ICollectionBookmarkDto \*/ async getById(
  authToken: string, id: string, filter?: Record<string, any> |
  ICollectionBookmarkDto, ): Promise<ResponseDto<ICollectionBookmarkDto>> {
  return ErrorUtils.newTryFail(async () => { const fetchUrl =
  parseUrlWithQuery(API_PATHS.BOOKMARK + "/" + id, filter); const response:
  ResponseDto<ICollectionBookmarkDto> = await this.connector.get({ path:
  fetchUrl, authToken }); if (Number(response.statusCode || response.code) > 226
  || response.status === Status.ERROR) return response; return response; }); }

/\*\*

- create. This method creates a new collection bookmark.
- @param payload createBookMarkDto \*/ async create(authToken: string, payload:
  createBookMarkDto): Promise<ResponseDto<ICollectionBookmarkDto>> { return
  ErrorUtils.newTryFail(async () => { const credentials = { ...payload }; const
  response: ResponseDto<ICollectionBookmarkDto> = await this.connector.post({
  path: API_PATHS.BOOKMARK, body: credentials, authToken, }); if
  (Number(response.statusCode || response.code) > 226 || response.status ===
  Status.ERROR) return response; return response; }); }

/\*\*

- delete. This method deleted a collection bookmark.
- @param payload is, the bookmark id \*/ async delete(authToken: string, id:
  string): Promise<ResponseDto<ICollectionBookmarkDto>> { return
  ErrorUtils.newTryFail(async () => { const response:
  ResponseDto<ICollectionBookmarkDto> = await this.connector.delete({ path:
  API_PATHS.BOOKMARK + "/" + id, authToken, }); if (Number(response.statusCode
  || response.code) > 226 || response.status === Status.ERROR) return response;
  return response; }); } }

================================================ FILE:
src/services/bookmark/index.ts ================================================
export \* from "./bookmark";

================================================ FILE:
src/services/chat/chat.dto.ts ================================================
import { ResponseDto } from "../../utils"; import { IUser } from
"../auth/auth.dto";

export interface IChatMessage { \_id: string; user: IUser | string; type:
string; conversation: IChatConversation | string; mediaId: IFile | string;
content: string; quotedContent: string; quotedContentId: IChatMessage | string;
mediaType?: string; seen?: string; readBy?: string[]; createdAt?: string | Date;
deletedAt?: string | Date; updateAt?: string | Date; }

export interface IChatConversation { \_id: string; type: string; recipients:
IUser[] | string[]; messages: IChatMessage[] | string[]; createdAt?: string |
Date; deletedAt?: string | Date; updateAt?: string | Date; }

export interface IFile { \_id: string; name: string; uploaded_by: IUser |
string; url: string; meta: object; status: boolean; isDeleted: boolean;
createdAt?: string | Date; deletedAt?: string | Date; updatedAt?: string | Date;
}

export interface ChatModuleType { getUserMessages(authToken: string):
Promise<ResponseDto<IChatConversation[]>>; }

================================================ FILE: src/services/chat/chat.ts
================================================ import Container, { Service }
from "typedi"; import { PaktConnector } from "../../connector"; import {
API_PATHS, ErrorUtils, ResponseDto, Status } from "../../utils"; import {
ChatModuleType, IChatConversation } from "./chat.dto";

// Export all Types to Service export \* from "./chat.dto";

@Service({ factory: (data: { id: string }) => { return new ChatModule(data.id);
}, transient: true, }) export class ChatModule implements ChatModuleType {
private id: string; private connector: PaktConnector;

constructor(id: string) { this.id = id; this.connector =
Container.of(this.id).get(PaktConnector); }

getUserMessages(authToken: string): Promise<ResponseDto<IChatConversation[]>> {
return ErrorUtils.newTryFail(async () => { const response:
ResponseDto<IChatConversation[]> = await this.connector.get({ path:
API_PATHS.GET_USER_MESSAGES, authToken, }); if (Number(response.statusCode ||
response.code) > 226 || response.status === Status.ERROR) return response;
return response; }); } }

================================================ FILE:
src/services/chat/index.ts ================================================
export \* from "./chat";

================================================ FILE:
src/services/collection/collection.dto.ts
================================================ import { IAny, ResponseDto }
from "../../utils/response"; import { IUser } from "../auth"; import {
IInviteDto } from "../invite"; import { IReviewDto } from "../review"; import {
ITagCategory } from "../tagCategory/tagCategory.dto"; import { IUploadDto } from
"../upload"; import { IWalletDto } from "../wallet";

export interface ICollectionTypeDto { \_id: string; name: string; value: string;
createdAt?: string | Date; deletedAt?: string | Date; updateAt?: string | Date;
}

export type ICollectionStatus = "ongoing" | "pending" | "deleted" | "waiting" |
"cancelled" | "completed";

interface IAttachmentDto { \_id?: string; url?: string; } export interface
ICollectionDto { \_id?: string; creator: string | IUser; owner?: string | IUser;
receiver?: IUser; owners?: IUser[]; name: string; description: string; type:
string; build?: string; category?: string; parent?: ICollectionDto | string;
collections?: ICollectionDto[] | string[]; stage?: number; image?: IUploadDto;
invite?: string | IInviteDto; invites?: string[] | IInviteDto[]; applications?:
string[]; //TODO:: addd IApplicationDto wallet?: string | IWalletDto;
attachments?: IAttachmentDto[]; attachmentData?: string[]; status?:
ICollectionStatus; inviteAccepted?: boolean; isPrivate?: boolean; rating?:
string | IReviewDto; recipientRating?: string | IReviewDto; ratings?: string[] |
IReviewDto[]; score?: number; progress?: number; isDeleted?: boolean; charges?:
string; expectedAmount?: string; usdExpectedAmount?: string; usdExpectedFee?:
string; rate?: string; cancellationReason?: string; completed?: boolean;
payoutTransactions?: string[]; failedPayoutCount?: number; releaseFundAmount?:
string; tagsData?: string[]; tags?: string[] | ITagCategory[]; payoutStatus?:
string; paymentStatus?: string; feePayoutStatus?: string; paktFeePayoutStatus?:
string; escrowPaid?: boolean; paymentFee?: number; earlyBonus?: string;
latePenaltyFee?: string; failureFee?: string; encodeKey?: string; paymentCoin?:
string; paymentAddress?: string; payoutResponse?: string; feePayoutResponse?:
string; isFundingRequest?: boolean; isOpenFundingRequest?: boolean;
paymentWebHook?: string; webHookAmount?: string; emailToken?: string;
deliveryDate?: string; completedDate?: string; recipientCompletedJob?: boolean;
paktCharges?: string; usdExpectedAdminFee?: string; usdExpectedPaktFee?: string;
feePercentage?: string; paktFeePercentage?: string; issue?: string; //TODO add
IIssuesDTO failedFeePayoutCount?: number; failedPaktFeePayoutCount?: number;
meta?: Record<string, IAny>; chainId?: string; isParentFunded?: boolean;
isEscrow?: boolean; issuePayoutAmount?: number; escrowReleased?: {
creatorReleased: boolean; creatorAmount: number; ownerReleased: boolean;
ownerAmount: number; }; indexedData?: Record<string, IAny>; lastIndexedTime?:
string; indexerId?: string; createdAt?: string | Date; deletedAt?: string |
Date; updatedAt?: string | Date; }

export type CreateCollectionDto = { type: string; name: string; category?:
string; description: string; isPrivate: boolean; deliveryDate?: string; tags?:
string[]; attachments?: string[]; meta?: Record<string, any>; paymentFee?:
number; parent?: string; image?: string; status?: ICollectionStatus; };

export type CreateManyCollectionDto = { type: string; parent: string;
collections: { name: string; description: string; isPrivate: boolean; category?:
string; deliveryDate?: string; tags?: string[]; attachments?: string[]; meta?:
Record<string, any>; paymentFee?: number; }[]; };

export type assignCollectionDto = { collectionId: string; talentId: string; };

export type FindCollectionDto = { page: number; pages: number; total: number;
limit: number; data: ICollectionDto[]; };

export type FindCollectionTypeDto = { page: number; pages: number; total:
number; limit: number; data: ICollectionTypeDto[]; };

export type filterCollectionDto = | ({ page?: string; limit?: string; receiver?:
string; } & ICollectionDto) | any;

export type cancelCollectionDto = { reason: string; paymentPercentage: number;
};

//the name & description are required, to update the collection export interface
UpdateCollectionDto { type?: string; name: string; description: string;
isPrivate?: boolean; category?: string | undefined; paymentFee?: number |
undefined; deliveryDate?: string | undefined; tags?: string[] | undefined;
parent?: string; image?: string; status?: ICollectionStatus; attachments?:
string[]; meta?: Record<string, any>; }

export interface UpdateManyCollectionsDto { collections: { id: string; type?:
string; name: string; description: string; isPrivate?: boolean; category?:
string | undefined; paymentFee?: number | undefined; deliveryDate?: string |
undefined; tags?: string[] | undefined; parent?: string; image?: string;
status?: ICollectionStatus; attachments?: string[]; meta?: Record<string, any>;
}[]; }

export interface CollectionModuleType { getAll(authToken: string, filter?:
filterCollectionDto): Promise<ResponseDto<FindCollectionDto>>;
getById(authToken: string, id: string): Promise<ResponseDto<ICollectionDto>>;
getTypes(authToken: string, filter?: filterCollectionDto):
Promise<ResponseDto<FindCollectionTypeDto>>; getACollectionType(authToken:
string, typeId: string): Promise<ResponseDto<ICollectionTypeDto>>;
create(authToken: string, payload: CreateCollectionDto):
Promise<ResponseDto<ICollectionDto>>; createMany(authToken: string, payload:
CreateManyCollectionDto): Promise<ResponseDto<ICollectionDto[]>>;
updateCollection(authToken: string, id: string, payload: UpdateCollectionDto):
Promise<ResponseDto<{}>>; deleteACollection(authToken: string, id: string):
Promise<ResponseDto<{}>>; updateManyCollections(authToken: string, collections:
UpdateManyCollectionsDto): Promise<ResponseDto<{}>>; }

================================================ FILE:
src/services/collection/collection.ts
================================================ import { Container, Service }
from "typedi"; import { PaktConnector } from "../../connector"; import {
API_PATHS } from "../../utils/constants"; import { ErrorUtils, ResponseDto,
Status, parseUrlWithQuery } from "../../utils/response"; import {
CollectionModuleType, CreateCollectionDto, CreateManyCollectionDto,
FindCollectionDto, FindCollectionTypeDto, ICollectionDto, ICollectionTypeDto,
UpdateCollectionDto, UpdateManyCollectionsDto, filterCollectionDto, } from
"./collection.dto";

// Export all Types to Service export \* from "./collection.dto";

@Service({ factory: (data: { id: string }) => { return new
CollectionModule(data.id); }, transient: true, }) export class CollectionModule
implements CollectionModuleType { private id: string; private connector:
PaktConnector; constructor(id: string) { this.id = id; this.connector =
Container.of(this.id).get(PaktConnector); }

/\*\*

- findall. This method finds all logged User's Jobs both created and assigned.
- @param filter filterDto \*/ async getAll(authToken: string, filter?:
  filterCollectionDto): Promise<ResponseDto<FindCollectionDto>> { return
  ErrorUtils.newTryFail(async () => { const fetchUrl =
  parseUrlWithQuery(`${API_PATHS.COLLECTION}`, filter); const response:
  ResponseDto<FindCollectionDto> = await this.connector.get({ path: fetchUrl,
  authToken }); if (Number(response.statusCode || response.code) > 226 ||
  response.status === Status.ERROR) return response; return response; }); }

/\*\*

- findall. This method finds all logged User's Jobs both created and assigned.
- @param filter filterCollectionDto \*/ async getById(authToken: string, id:
  string): Promise<ResponseDto<ICollectionDto>> { return
  ErrorUtils.newTryFail(async () => { const fetchUrl = API_PATHS.COLLECTION +
  "/" + id; const response: ResponseDto<ICollectionDto> = await
  this.connector.get({ path: fetchUrl, authToken }); if
  (Number(response.statusCode || response.code) > 226 || response.status ===
  Status.ERROR) return response; return response; }); }

/\*\*

- getTypes. This method finds collection types accepted for creating collection
- @param filter filterDto \*/ async getTypes(authToken: string, filter?:
  filterCollectionDto): Promise<ResponseDto<FindCollectionTypeDto>> { return
  ErrorUtils.newTryFail(async () => { const fetchUrl =
  parseUrlWithQuery(API_PATHS.COLLECTION_TYPE, filter); const response:
  ResponseDto<FindCollectionTypeDto> = await this.connector.get({ path:
  fetchUrl, authToken }); if (Number(response.statusCode || response.code) > 226
  || response.status === Status.ERROR) return response; return response; }); }

/\*\*

- create. This method creates a new Job.
- @param payload CreateCollectionDto \*/ async create(authToken: string,
  payload: CreateCollectionDto): Promise<ResponseDto<ICollectionDto>> { return
  ErrorUtils.newTryFail(async () => { const credentials = { ...payload }; const
  response: ResponseDto<ICollectionDto> = await this.connector.post({ path:
  API_PATHS.COLLECTION, body: credentials, authToken, }); if
  (Number(response.statusCode || response.code) > 226 || response.status ===
  Status.ERROR) return response; return response; }); }

/\*\*

- createMany. This method creates multiple collections for a type
- @param filter CreateManyCollectionDto \*/ async createMany(authToken: string,
  payload: CreateManyCollectionDto): Promise<ResponseDto<ICollectionDto[]>> {
  return ErrorUtils.newTryFail(async () => { const credentials = { ...payload };
  const response: ResponseDto<ICollectionDto[]> = await this.connector.post({
  path: API_PATHS.COLLECTION, body: credentials, authToken, }); if
  (Number(response.statusCode || response.code) > 226 || response.status ===
  Status.ERROR) return response; return response; }); }

updateCollection(authToken: string, id: string, payload: UpdateCollectionDto):
Promise<ResponseDto<{}>> { return ErrorUtils.newTryFail(async () => { const
query = `${API_PATHS.COLLECTION_UPDATE}/${id}`; const credentials = { ...payload
}; const response: ResponseDto<{}> = await this.connector.patch({ path: query,
body: credentials, authToken, }); if (Number(response.statusCode ||
response.code) > 226 || response.status === Status.ERROR) return response;
return response; }); }

getACollectionType(authToken: string, typeId: string):
Promise<ResponseDto<ICollectionTypeDto>> { return ErrorUtils.newTryFail(async ()
=> { const fetchUrl =
parseUrlWithQuery(`${API_PATHS.COLLECTION_TYPE}/${typeId}`, { id: typeId });
const response: ResponseDto<ICollectionTypeDto> = await this.connector.get({
path: fetchUrl, authToken, }); if (Number(response.statusCode ||
response.code) > 226 || response.status === Status.ERROR) return response;
return response; }); }

deleteACollection(authToken: string, collectionId: string):
Promise<ResponseDto<{}>> { return ErrorUtils.newTryFail(async () => { const
response: ResponseDto<ICollectionTypeDto> = await this.connector.delete({ path:
`${API_PATHS.COLLECTION}/${collectionId}`, authToken, }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); }

updateManyCollections(authToken: string, collections: UpdateManyCollectionsDto):
Promise<ResponseDto<{}>> { return ErrorUtils.newTryFail(async () => { const
response: ResponseDto<ICollectionTypeDto> = await this.connector.patch({ path:
`${API_PATHS.COLLECTION}/many/update`, body: { collections }, authToken, }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); } }

================================================ FILE:
src/services/collection/index.ts
================================================ export \* from "./collection";

================================================ FILE:
src/services/connectionFilter/connectionFilter.dto.ts
================================================ import { ResponseDto } from
"../../utils";

export type IConnectionKeys = "tags" | "tagCount" | "afroScore";

export type IConnectionFilterDecider = "greater_than" | "less_than" | "equal_to"
| "contains" | "between";

export type IConnectionEvents = "CREATE_CONVERSATION";

export interface IConnectionFilter { \_id?: string; event: IConnectionEvents;
key: IConnectionKeys; value: string | number | string[]; decider:
IConnectionFilterDecider; createdAt?: string | Date; deletedAt?: string | Date;
updatedAt?: string | Date; }

export interface ConnectionFilterModuleType { create(authToken: string, payload:
IConnectionFilter): Promise<ResponseDto<IConnectionFilter>>;
getForAUser(authToken: string): Promise<ResponseDto<IConnectionFilter>>;
update(authToken: string, payload: IConnectionFilter):
Promise<ResponseDto<IConnectionFilter>>; }

================================================ FILE:
src/services/connectionFilter/connectionFilter.ts
================================================ import Container, { Service }
from "typedi"; import { PaktConnector } from "../../connector"; import {
API_PATHS, ErrorUtils, ResponseDto, Status } from "../../utils"; import {
ConnectionFilterModuleType, IConnectionFilter } from "./connectionFilter.dto";

export \* from "./connectionFilter.dto";

@Service({ factory: (data: { id: string }) => { return new
ConnectionFilterModule(data.id); }, transient: true, }) export class
ConnectionFilterModule implements ConnectionFilterModuleType { private id:
string; private connector: PaktConnector;

constructor(id: string) { this.id = id; this.connector =
Container.of(this.id).get(PaktConnector); }

create(authToken: string, payload: IConnectionFilter):
Promise<ResponseDto<IConnectionFilter>> { return ErrorUtils.newTryFail(async ()
=> { const requestBody = { ...payload }; const response:
ResponseDto<IConnectionFilter> = await this.connector.post({ path:
API_PATHS.CREATE_CONNECTION_FILTER, body: requestBody, authToken, }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); }

update(authToken: string, payload: IConnectionFilter):
Promise<ResponseDto<IConnectionFilter>> { return ErrorUtils.newTryFail(async ()
=> { const requestBody = { ...payload }; const response:
ResponseDto<IConnectionFilter> = await this.connector.patch({ path:
API_PATHS.UPDATE_CONNECTION_FILTER, body: requestBody, authToken, }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); }

getForAUser(authToken: string): Promise<ResponseDto<IConnectionFilter>> { return
ErrorUtils.newTryFail(async () => { const response:
ResponseDto<IConnectionFilter> = await this.connector.get({ path:
API_PATHS.GET_CONNECTION_FILTER, authToken, }); if (Number(response.statusCode
|| response.code) > 226 || response.status === Status.ERROR) return response;
return response; }); } }

================================================ FILE:
src/services/connectionFilter/index.ts
================================================ export \* from
"./connectionFilter";

================================================ FILE:
src/services/direct-deposit/direct-deposit.dto.ts
================================================ import { IAny, IModel,
ResponseDto } from "../../utils"; import { IUser } from "../auth"; import {
ICollectionDto } from "../collection";

export interface ICreateDirectDepositPayload { collectionType: string; amount:
number; coin: string; name: string; description: string; owner: string; }

export interface IValidateDirectDepositPayload { collection: string; method?:
"stripe" | "crypto"; status?: string; owner?: string; meta?: Record<string,
IAny>; release?: boolean; }

export interface ICreateDirectDepositResponse { coin: string; address: string;
collectionAmount: number; collectionAmountCoin: number; expectedFee: number;
amountToPay: number; usdFee: number; usdAmount: number; feePercentage: number;
rate: number; chainId: string; contractAddress: string; paymentMethods:
string[]; collectionId: string; }

export interface IValidateDirectDepositResponse extends ICollectionDto {
isFundingRequest: boolean; creator: string | IUser; }

export interface IBlockchainCoin extends IModel { name: string; symbol: string;
icon: string; reference: string; priceTag: string; contractAddress: string;
decimal: string; rpcChainId: string; isToken: boolean; active: boolean; order?:
number; }

export interface IRPCServer extends IModel { rpcName: string; rpcChainId:
string; rpcUrls: string[]; blockExplorerUrls: string[]; rpcNativeCurrency: {
name: string; symbol: string; decimals: string; }; active: boolean; authlock?:
boolean; username?: string; password?: string; }

export interface DirectDepositModuleType { createDirectDeposit(props: {
authToken: string; payload: ICreateDirectDepositPayload; }):
Promise<ResponseDto<ICreateDirectDepositResponse>>;

validateDirectDeposit(props: { authToken: string; payload:
IValidateDirectDepositPayload; }):
Promise<ResponseDto<IValidateDirectDepositResponse>>;

fetchPaymentMethods(authToken: string): Promise<ResponseDto<IBlockchainCoin[]>>;

fetchActiveRPC(authToken: string): Promise<ResponseDto<IRPCServer>>; }

================================================ FILE:
src/services/direct-deposit/direct-deposit.ts
================================================ import Container, { Service }
from "typedi"; import { DirectDepositModuleType, IBlockchainCoin,
ICreateDirectDepositPayload, ICreateDirectDepositResponse, IRPCServer,
IValidateDirectDepositPayload, IValidateDirectDepositResponse, } from
"./direct-deposit.dto"; import { PaktConnector } from "../../connector"; import
{ API_PATHS, ErrorUtils, ResponseDto, Status } from "../../utils";

@Service({ factory: (data: { id: string }) => { return new
DirectDepositModule(data.id); }, transient: true, }) export class
DirectDepositModule implements DirectDepositModuleType { private id: string;
private connector: PaktConnector;

constructor(id: string) { this.id = id; this.connector =
Container.of(this.id).get(PaktConnector); }

createDirectDeposit(props: { authToken: string; payload:
ICreateDirectDepositPayload; }):
Promise<ResponseDto<ICreateDirectDepositResponse>> { const { payload, authToken
} = props; return ErrorUtils.newTryFail(async () => { const requestBody = {
...payload }; const response: ResponseDto<ICreateDirectDepositResponse> = await
this.connector.post({ path: API_PATHS.CREATE_DIRECT_DEPOSIT, body: requestBody,
authToken, }); if (Number(response.statusCode || response.code) > 226 ||
response.status === Status.ERROR) return response; return response; }); }
validateDirectDeposit(props: { authToken: string; payload:
IValidateDirectDepositPayload; }):
Promise<ResponseDto<IValidateDirectDepositResponse>> { const { payload,
authToken } = props; return ErrorUtils.newTryFail(async () => { const
requestBody = { ...payload }; const response:
ResponseDto<IValidateDirectDepositResponse> = await this.connector.post({ path:
API_PATHS.VALIDATE_DIRECT_DEPOSIT, body: requestBody, authToken, }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); }
fetchPaymentMethods(authToken: string): Promise<ResponseDto<IBlockchainCoin[]>>
{ return ErrorUtils.newTryFail(async () => { const response:
ResponseDto<IBlockchainCoin[]> = await this.connector.get({ path:
API_PATHS.FETCH_PAYMENT_METHODS, authToken, }); if (Number(response.statusCode
|| response.code) > 226 || response.status === Status.ERROR) return response;
return response; }); } fetchActiveRPC(authToken: string):
Promise<ResponseDto<IRPCServer>> { return ErrorUtils.newTryFail(async () => {
const response: ResponseDto<IRPCServer> = await this.connector.get({ path:
API_PATHS.FETCH_ACTIVE_RPC, authToken, }); if (Number(response.statusCode ||
response.code) > 226 || response.status === Status.ERROR) return response;
return response; }); } }

================================================ FILE:
src/services/direct-deposit/index.ts
================================================ export \* from
"./direct-deposit";

================================================ FILE:
src/services/feed/feed.dto.ts ================================================
import { ResponseDto } from "../../utils/response"; import { IUser } from
"../auth"; import { ICollectionDto } from "../collection";

export interface IFeed { \_id: string; creator?: string; owner?: string;
owners?: IUser[] | string[]; data?: ICollectionDto | string; description:
string; title: string; type: string; isPublic?: boolean; closed?: boolean;
createdAt?: string | Date; deletedAt?: string | Date; updatedAt?: string | Date;
}

export enum FEED_TYPES_ENUM { COLLECTION_INVITE = "collection_invite",
COLLECTION_INVITE_REJECTED = "collection_invite_rejected",
COLLECTION_INVITE_ACCEPTED = "collection_invite_accepted",
COLLECTION_INVITE_CANCELLED = "collection_invite_cancelled", COLLECTION_CREATED
= "collection_created", COLLECTION_UPDATE = "collection_update",
COLLECTION_DELIVERED = "collection_delivered", COLLECTION_CANCELLED =
"collection_cancelled", COLLECTION_COMPLETED = "collection_completed",
COLLECTION_REVIEWED = "collection_reviewed", PAYMENT_RELEASED =
"payment_released", REFERRAL_SIGNUP = "referral_signup",
REFERRAL_COLLECTION_COMPLETION = "referral_job_completion", }

export type FEED_TYPES = | "collection_invite" | "collection_invite_rejected" |
"collection_invite_accepted" | "collection_invite_cancelled" |
"collection_created" | "collection_update" | "collection_delivered" |
"collection_cancelled" | "collection_completed" | "collection_reviewed" |
"payment_released" | "referral_signup" | "referral_job_completion";

export interface CreateFeedDto { title: string; description: string; type:
FEED_TYPES; data: string; isPublic: boolean; owners?: string[] | string; }

export type FilterFeedDto = { page?: string; limit?: string; owner?: string;
type?: FEED_TYPES; isOwner?: boolean; isPublic?: boolean; };

export interface FindFeedDto { data: IFeed[]; total: number; pages: number;
page: number; limit: number; }

export interface FeedModuleType { create(authToken: string, payload:
CreateFeedDto): Promise<ResponseDto<{}>>; getAll(authToken: string, filter?:
FilterFeedDto): Promise<ResponseDto<FindFeedDto>>; getById(authToken: string,
filterId: string): Promise<ResponseDto<IFeed>>; dismissAllFeeds(authToken:
string): Promise<ResponseDto<{}>>; dismissAFeed(authToken: string, filterId:
string): Promise<ResponseDto<{}>>; }

================================================ FILE: src/services/feed/feed.ts
================================================ import { Container, Service }
from "typedi"; import { PaktConnector } from "../../connector/connector"; import
{ API_PATHS } from "../../utils/constants"; import { ErrorUtils, ResponseDto,
Status, parseUrlWithQuery } from "../../utils/response"; import { CreateFeedDto,
FeedModuleType, FilterFeedDto, FindFeedDto, IFeed } from "./feed.dto";

export \* from "./feed.dto";

@Service({ factory: (data: { id: string }) => { return new FeedModule(data.id);
}, transient: true, }) export class FeedModule implements FeedModuleType {
private id: string; private connector: PaktConnector; constructor(id: string) {
this.id = id; this.connector = Container.of(this.id).get(PaktConnector); }

create(authToken: string, payload: CreateFeedDto): Promise<ResponseDto<{}>> {
return ErrorUtils.newTryFail(async () => { const credentials = { ...payload };
const response: ResponseDto<{}> = await this.connector.post({ path:
`${API_PATHS.FEEDS}/`, body: credentials, authToken, }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); }

getAll(authToken: string, filter?: FilterFeedDto):
Promise<ResponseDto<FindFeedDto>> { return ErrorUtils.newTryFail(async () => {
const theFilter = filter ? { ...filter, isOwner: true } : { isOwner: true };
const fetchUrl = parseUrlWithQuery(`${API_PATHS.FEEDS}/`, { ...theFilter });
const response: ResponseDto<FindFeedDto> = await this.connector.get({ path:
fetchUrl, authToken, }); if (Number(response.statusCode || response.code) > 226
|| response.status === Status.ERROR) return response; return response; }); }

getById(authToken: string, filterId: string): Promise<ResponseDto<IFeed>> {
return ErrorUtils.newTryFail(async () => { const response: ResponseDto<IFeed> =
await this.connector.get({ path: `${API_PATHS.FEEDS}/${filterId}`, authToken,
}); if (Number(response.statusCode || response.code) > 226 || response.status
=== Status.ERROR) return response; return response; }); }

dismissAllFeeds(authToken: string): Promise<ResponseDto<{}>> { return
ErrorUtils.newTryFail(async () => { const response: ResponseDto<IFeed> = await
this.connector.put({ path: `${API_PATHS.FEEDS_DISMISS_ALL}`, authToken, }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); }

dismissAFeed(authToken: string, filterId: string): Promise<ResponseDto<{}>> {
return ErrorUtils.newTryFail(async () => { const response: ResponseDto<IFeed> =
await this.connector.put({ path: `${API_PATHS.FEEDS}/${filterId}/dismiss`,
authToken, }); if (Number(response.statusCode || response.code) > 226 ||
response.status === Status.ERROR) return response; return response; }); } }

================================================ FILE:
src/services/feed/index.ts ================================================
export \* from "./feed";

================================================ FILE:
src/services/invite/index.ts ================================================
export \* from "./invite";

================================================ FILE:
src/services/invite/invite.dto.ts
================================================ import { ResponseDto } from
"../../utils"; import { IUser } from "../auth/auth.dto"; import { ICollectionDto
} from "../collection/collection.dto";

export type IInviteStatus = "pending" | "accepted" | "rejected";

export interface IInviteDto { \_id: string; sender: IUser | string; receiver:
IUser | string; data: ICollectionDto | string; message: string; description:
string; status: IInviteStatus; emailToken: string; acceptedAt?: string;
createdAt?: string | Date; deletedAt?: string | Date; updatedAt?: string | Date;
}

export interface SendInviteDto { recipient: string; collection: string; }

export type FilterInviteDto = | ({ page?: string; limit?: string; } &
IInviteDto) | any;

export interface FindInvitesDto { data: IInviteDto[]; total: number; pages:
number; page: number; limit: number; }

export interface InviteModuleType { sendInvite(authToken: string, payload:
SendInviteDto): Promise<ResponseDto<{}>>; acceptInvite(authToken: string,
inviteId: string): Promise<ResponseDto<{}>>; declineInvite(authToken: string,
inviteId: string): Promise<ResponseDto<{}>>; cancelInvite(authToken: string,
inviteId: string): Promise<ResponseDto<{}>>; getAll(authToken: string, filter?:
FilterInviteDto): Promise<ResponseDto<FindInvitesDto>>; getAnInvite(authToken:
string, id: string): Promise<ResponseDto<IInviteDto>>; }

================================================ FILE:
src/services/invite/invite.ts ================================================
import Container, { Service } from "typedi"; import { PaktConnector } from
"../../connector/connector"; import { API_PATHS, ErrorUtils, ResponseDto,
Status, parseUrlWithQuery } from "../../utils"; import { FilterInviteDto,
FindInvitesDto, IInviteDto, InviteModuleType, SendInviteDto } from
"./invite.dto";

export \* from "./invite.dto";

@Service({ factory: (data: { id: string }) => { return new
InviteModule(data.id); }, transient: true, }) export class InviteModule
implements InviteModuleType { private id: string; private connector:
PaktConnector; constructor(id: string) { this.id = id; this.connector =
Container.of(this.id).get(PaktConnector); }

sendInvite(authToken: string, payload: SendInviteDto): Promise<ResponseDto<{}>>
{ return ErrorUtils.newTryFail(async () => { const url =
`${API_PATHS.SEND_INVITE}`; const payloadInfo = { ...payload }; const response:
ResponseDto<{}> = await this.connector.post({ path: url, body: payloadInfo,
authToken, }); if (Number(response.statusCode || response.code) > 226 ||
response.status === Status.ERROR) return response; return response; }); }

acceptInvite(authToken: string, inviteId: string): Promise<ResponseDto<{}>> {
return ErrorUtils.newTryFail(async () => { const url =
`${API_PATHS.ACCEPT_INVITE}/${inviteId}/accept`; const response: ResponseDto<{}>
= await this.connector.post({ path: url, authToken, }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); }

declineInvite(authToken: string, inviteId: string): Promise<ResponseDto<{}>> {
return ErrorUtils.newTryFail(async () => { const url =
`${API_PATHS.DECLINE_INVITE}/${inviteId}/decline`; const response:
ResponseDto<{}> = await this.connector.post({ path: url, authToken, }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); }

getAll(authToken: string, filter?: FilterInviteDto):
Promise<ResponseDto<FindInvitesDto>> { return ErrorUtils.newTryFail(async () =>
{ const fetchUrl = parseUrlWithQuery(API_PATHS.VIEW_ALL_INVITE, filter); const
response: ResponseDto<FindInvitesDto> = await this.connector.get({ path:
fetchUrl, authToken }); if (Number(response.statusCode || response.code) > 226
|| response.status === Status.ERROR) return response; return response; }); }

getAnInvite(authToken: string, id: string): Promise<ResponseDto<IInviteDto>> {
return ErrorUtils.newTryFail(async () => { const fetchUrl =
`${API_PATHS.VIEW_A_INVITE}/${id}`; const response: ResponseDto<IInviteDto> =
await this.connector.get({ path: fetchUrl, authToken }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); }

cancelInvite(authToken: string, inviteId: string): Promise<ResponseDto<{}>> {
return ErrorUtils.newTryFail(async () => { const url =
`${API_PATHS.CANCEL_AN_INVITE}/${inviteId}/cancel`; const response:
ResponseDto<{}> = await this.connector.post({ path: url, authToken, }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); } }

================================================ FILE:
src/services/notification/index.ts
================================================ export \* from
"./notification";

================================================ FILE:
src/services/notification/notification.dto.ts
================================================ import { ResponseDto } from
"../../utils/response";

enum INotificationType { NEW_PROJECT = "new_project", NEW_JOB = "new_job",
ASSIGNED_JOB = "assigned_job", NEW_DEPOSIT = "new_deposit", NEW_TRANSFER =
"new_transfer", NEW_WITHDRAWAL = "new_withdrawal", INVITE_ACCEPTED =
"invite_accepted", INVITE_RECEIVED = "invite_received", INVITE_REJECTED =
"invite_rejected", ADMIN_CONFIGURE = "ADMIN_CONFIGURE", USER_REGISTER =
"USER_REGISTER", USER_LOGIN = "USER_LOGIN", PROJECT_CREATE = "PROJECT_CREATE",
JOB_CREATE = "JOB_CREATE", JOB_ASSIGN = "JOB_ASSIGN", JOB_CANCEL = "JOB_CANCEL",
JOB_APPLY = "JOB_APPLY", WALLET_GENERATED = "WALLET_GENERATED", }

interface NotificationUser { profile: { talent: { tags: string[]; availability:
"busy" | "available" | "working"; skillIds: object[]; }; }; \_id: string;
firstName: string; lastName: string; type: string; score: number; }

export interface INotificationDto { \_id: string; owner: NotificationUser;
title: string; description: string; read: boolean; notifyUser: NotificationUser;
data: string; isAdmin: boolean; type: INotificationType; createdAt?: string |
Date; deletedAt?: string | Date; updatedAt?: string | Date; }

export type FindNotificationDto = { page: number; pages: number; total: number;
limit: number; notification: INotificationDto[]; };

export type filterNotificationDto = | ({ page?: string; limit?: string; } &
INotificationDto) | any;

export interface NotificationModuleType { getAll(authToken: string, filter?:
filterNotificationDto): Promise<ResponseDto<FindNotificationDto>>;
markOneAsRead(authToken: string, id: string, filter?: filterNotificationDto):
Promise<ResponseDto<void>>; markAll(authToken: string):
Promise<ResponseDto<void>>; }

================================================ FILE:
src/services/notification/notification.ts
================================================ import { Container, Service }
from "typedi"; import { PaktConnector } from "../../connector"; import {
API_PATHS } from "../../utils/constants"; import { ErrorUtils, ResponseDto,
Status, parseUrlWithQuery } from "../../utils/response"; import {
FindNotificationDto, NotificationModuleType, filterNotificationDto } from
"./notification.dto";

export \* from "./notification.dto";

@Service({ factory: (data: { id: string }) => { return new
NotificationModule(data.id); }, transient: true, }) export class
NotificationModule implements NotificationModuleType { private id: string;
private connector: PaktConnector; constructor(id: string) { this.id = id;
this.connector = Container.of(this.id).get(PaktConnector); }

async getAll(authToken: string, filter?: filterNotificationDto):
Promise<ResponseDto<FindNotificationDto>> { const fetchUrl =
parseUrlWithQuery(API_PATHS.NOTIFICATION_FETCH, filter); return
ErrorUtils.newTryFail(async () => { const response:
ResponseDto<FindNotificationDto> = await this.connector.get({ path: fetchUrl,
authToken, }); if (Number(response.statusCode || response.code) > 226 ||
response.status === Status.ERROR) return response; return response; }); }

async markAll(authToken: string): Promise<ResponseDto<void>> { return
ErrorUtils.newTryFail(async () => { const response: ResponseDto<void> = await
this.connector.post({ path: API_PATHS.NOTIFICATION_MARK_ALL, authToken, }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); }

async markOneAsRead(authToken: string, id: string): Promise<ResponseDto<void>> {
return ErrorUtils.newTryFail(async () => { const response: ResponseDto<void> =
await this.connector.post({ path: API_PATHS.NOTIFICATION_MARK_ONE + "/" + id,
authToken, }); if (Number(response.statusCode || response.code) > 226 ||
response.status === Status.ERROR) return response; return response; }); } }

================================================ FILE:
src/services/payment/index.ts ================================================
export \* from "./payment";

================================================ FILE:
src/services/payment/payment.dto.ts
================================================ import { ResponseDto } from
"../../utils";

export type IPaymentCoins = "usdc" | "avax";

export enum IPaymentStatusEnum { PENDING = "pending", ONGOING = "ongoing",
COMPLETED = "completed", WAITING = "waiting", CANCELLED = "cancelled", DELETED =
"deleted", }

export type IPaymentStatusType = "pending" | "ongoing" | "completed" | "waiting"
| "cancelled" | "deleted";

export interface ICreatePaymentDto { coin: IPaymentCoins; collection: string; }

export interface IPaymentDataDto { coin: string; address: string;
collectionAmount: number; collectionAmountCoin: string; expectedFee: string;
amountToPay: string; usdFee: string; usdAmount: string; feePercentage: number;
rate: number; chainId: string; }

export interface IValidatePaymentDto { collection: string; status?:
IPaymentStatusType; }

export interface IReleasePaymentDto { collection: string; amount: number; }

export interface IBlockchainCoinDto { name: string; symbol: string; icon:
string; reference: string; priceTag: string; contractAddress: string; decimal:
string; rpcChainId: string; isToken: boolean; active: boolean; }

export interface IRPCDto { rpcName: string; rpcChainId: string; rpcUrls:
string[]; blockExplorerUrls: string[]; rpcNativeCurrency: { name: string;
symbol: string; decimals: string; }; active: boolean; }

export interface PaymentModuleType { create(authToken: string, payload:
ICreatePaymentDto): Promise<ResponseDto<IPaymentDataDto>>; validate(authToken:
string, payload: IValidatePaymentDto): Promise<ResponseDto<{}>>;
release(authToken: string, payload: IReleasePaymentDto):
Promise<ResponseDto<{}>>; paymentMethods(authToken: string):
Promise<ResponseDto<IBlockchainCoinDto[]>>; activeRpc(authToken: string):
Promise<ResponseDto<IRPCDto>>; }

================================================ FILE:
src/services/payment/payment.ts ================================================
import { Container, Service } from "typedi"; import { PaktConnector } from
"../../connector/connector"; import { API_PATHS } from "../../utils/constants";
import { ErrorUtils, ResponseDto, Status } from "../../utils/response"; import {
IBlockchainCoinDto, ICreatePaymentDto, IPaymentDataDto, IRPCDto,
IReleasePaymentDto, IValidatePaymentDto, PaymentModuleType, } from
"./payment.dto";

export \* from "./payment.dto";

@Service({ factory: (data: { id: string }) => { return new
PaymentModule(data.id); }, transient: true, }) export class PaymentModule
implements PaymentModuleType { private id: string; private connector:
PaktConnector; constructor(id: string) { this.id = id; this.connector =
Container.of(this.id).get(PaktConnector); }

create(authToken: string, payload: ICreatePaymentDto):
Promise<ResponseDto<IPaymentDataDto>> { return ErrorUtils.newTryFail(async () =>
{ const credentials = { ...payload }; const response:
ResponseDto<IPaymentDataDto> = await this.connector.post({ path:
`${API_PATHS.CREATE_ORDER}`, body: credentials, authToken, }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); }

validate(authToken: string, payload: IValidatePaymentDto):
Promise<ResponseDto<{}>> { return ErrorUtils.newTryFail(async () => { const
credentials = { ...payload }; const response: ResponseDto<IPaymentDataDto> =
await this.connector.post({ path: `${API_PATHS.VALIDATE_ORDER}`, body:
credentials, authToken, }); if (Number(response.statusCode || response.code) >
226 || response.status === Status.ERROR) return response; return response; }); }

release(authToken: string, payload: IReleasePaymentDto):
Promise<ResponseDto<{}>> { return ErrorUtils.newTryFail(async () => { const
credentials = { ...payload }; const response: ResponseDto<IPaymentDataDto> =
await this.connector.post({ path: `${API_PATHS.RELEASE_ORDER}`, body:
credentials, authToken, }); if (Number(response.statusCode || response.code) >
226 || response.status === Status.ERROR) return response; return response; }); }

paymentMethods(authToken: string): Promise<ResponseDto<IBlockchainCoinDto[]>> {
return ErrorUtils.newTryFail(async () => { const response:
ResponseDto<IBlockchainCoinDto[]> = await this.connector.get({ path:
`${API_PATHS.PAYMENT_METHODS}`, authToken, }); if (Number(response.statusCode ||
response.code) > 226 || response.status === Status.ERROR) return response;
return response; }); }

activeRpc(authToken: string): Promise<ResponseDto<IRPCDto>> { return
ErrorUtils.newTryFail(async () => { const response: ResponseDto<IRPCDto> = await
this.connector.get({ path: `${API_PATHS.RPC}`, authToken, }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); } }

================================================ FILE:
src/services/referrals/index.ts ================================================
export \* from "./referrals";

================================================ FILE:
src/services/referrals/referrals.dto.ts
================================================ import { ResponseDto } from
"src/utils"; import { IUser } from "../auth";

type IReferralProgramType = "unlimited" | "expiring" | "time_period_reset" |
"conditional" | "system" | "limited";

export interface IReferralProgram { title: string; description: string;
numberOfReferrals: string; invitationCap: string; code: string; type:
IReferralProgramType; link: string; expiresAt: string; timeframe: string;
status: boolean; isSystem: boolean; isAdminInvite: boolean; counts?: number;
numberOfDays?: number; conditional?: string; }

type IReferralProgramConditional = "referral" |
"five_star_collection_completion";

export interface IUserReferrals { referralId: IReferralProgram | string; userId:
IUser | string; referral: IUser | string; conditional:
IReferralProgramConditional; completedGig: boolean; status: boolean;
referred_at: string; type: IReferralProgramType; }

export interface FindUserReferrals extends IUserReferrals { data:
IUserReferrals[]; referralMessage: string; pages: number; total: number; limit:
number; }

export interface IUserReferralStats { referralLink: string; totalAllowedInvites:
number | string; inviteSent: number | string; }

export interface UserReferralModule { fetchUserReferrals( authToken: string,
filter?: { page?: number; limit?: number } & Record<string, any>, ):
Promise<ResponseDto<FindUserReferrals>>; fetchUserReferralsStats(authToken:
string): Promise<ResponseDto<IUserReferralStats>>;
sendReferrralsInvite(authToken: string, emails: string[]):
Promise<ResponseDto<{}>>; }

================================================ FILE:
src/services/referrals/referrals.ts
================================================ import Container, { Service }
from "typedi"; import { PaktConnector } from "../../connector"; import {
API_PATHS, ErrorUtils, ResponseDto, Status, parseUrlWithQuery } from
"../../utils"; import { FindUserReferrals, IUserReferralStats,
UserReferralModule } from "./referrals.dto";

@Service({ factory: (data: { id: string }) => { return new
ReferralsModule(data.id); }, transient: true, }) export class ReferralsModule
implements UserReferralModule { private id: string; private connector:
PaktConnector; constructor(id: string) { this.id = id; this.connector =
Container.of(this.id).get(PaktConnector); }

fetchUserReferrals(authToken: string, filter?: Record<string, any>):
Promise<ResponseDto<FindUserReferrals>> { return ErrorUtils.newTryFail(async ()
=> { const url = `${API_PATHS.FETCH_USER_REFERRALS}`; const fetchUrl =
parseUrlWithQuery(url, filter); const response: ResponseDto<FindUserReferrals> =
await this.connector.get({ path: fetchUrl, authToken }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); }
fetchUserReferralsStats(authToken: string):
Promise<ResponseDto<IUserReferralStats>> { return ErrorUtils.newTryFail(async ()
=> { const url = `${API_PATHS.FETCH_USER_REFERRAL_STATS}`;

      const response: ResponseDto<IUserReferralStats> = await this.connector.get({ path: url, authToken });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });

} sendReferrralsInvite(authToken: string, emails: string[]):
Promise<ResponseDto<{}>> { return ErrorUtils.newTryFail(async () => { const
response: ResponseDto<{}> = await this.connector.post({ path:
API_PATHS.SEND_REFERRALS_INVITE, body: emails, authToken, }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); } }

================================================ FILE:
src/services/review/index.ts ================================================
export \* from "./review";

================================================ FILE:
src/services/review/review.dto.ts
================================================ import { ResponseDto } from
"../../utils/response"; import { IUser } from "../auth"; import { ICollectionDto
} from "../collection";

export interface AddReviewDto { collectionId: string; rating: number; review:
string; receiver: string; }

export interface FindReviewDto { count: number; pages: number; data:
IReviewDto[]; }

export type FilterReviewDto = | ({ page?: string; limit?: string; } &
IReviewDto) | any;

export interface IReviewDto { \_id: string; data: ICollectionDto; owner: IUser |
string; receiver: IUser | string; type: string; review: string; rating: number;
createdAt?: string | Date; deletedAt?: string | Date; updatedAt?: string | Date;
}

export interface ReviewModuleType { addReview(authToken: string, payload:
AddReviewDto): Promise<ResponseDto<void>>; viewAll(authToken: string, filter?:
FilterReviewDto): Promise<ResponseDto<FindReviewDto>>; viewAReview(authToken:
string, reviewId: string): Promise<ResponseDto<IReviewDto>>; }

================================================ FILE:
src/services/review/review.ts ================================================
import Container, { Service } from "typedi"; import { PaktConnector } from
"../../connector"; import { API_PATHS } from "../../utils"; import { ErrorUtils,
ResponseDto, Status, parseUrlWithQuery } from "../../utils/response"; import {
AddReviewDto, FilterReviewDto, FindReviewDto, IReviewDto, ReviewModuleType }
from "./review.dto";

export \* from "./review.dto";

@Service({ factory: (data: { id: string }) => { return new
ReviewModule(data.id); }, transient: true, }) export class ReviewModule
implements ReviewModuleType { private id: string; private connector:
PaktConnector; constructor(id: string) { this.id = id; this.connector =
Container.of(this.id).get(PaktConnector); }

viewAll(authToken: string, filter?: FilterReviewDto | undefined):
Promise<ResponseDto<FindReviewDto>> { return ErrorUtils.newTryFail(async () => {
const fetchUrl = parseUrlWithQuery(API_PATHS.GET_REVIEW, filter);

      const response: ResponseDto<FindReviewDto> = await this.connector.get({
        path: fetchUrl,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });

}

viewAReview(authToken: string, reviewId: string):
Promise<ResponseDto<IReviewDto>> { return ErrorUtils.newTryFail(async () => {
const response: ResponseDto<IReviewDto> = await this.connector.get({ path:
`${API_PATHS.GET_REVIEW}${reviewId}`, authToken, }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); }

addReview(authToken: string, payload: AddReviewDto): Promise<ResponseDto<void>>
{ const reviewPayload = { ...payload }; return ErrorUtils.newTryFail(async () =>
{ const response: ResponseDto<void> = await this.connector.post({ path:
API_PATHS.ADD_REVIEW, body: reviewPayload, authToken, }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); } }

================================================ FILE:
src/services/tagCategory/index.ts
================================================ [Empty file]

================================================ FILE:
src/services/tagCategory/tagCategory.dto.ts
================================================ import { ResponseDto } from
"../../utils";

export interface ITagCategory { name: string; description: string; type: string;
icon?: string; color?: string; isParent?: boolean; parent: ITagCategory |
string; categories: ITagCategory[] | string[]; entryCount?: number; }

export interface FindTagCategories { data: ITagCategory[]; total: number; pages:
number; page: number; limit: number; }

export interface FilterTagCategories { page?: number; limt?: number; owner?:
string; type?: string; search?: string; }

export interface TagCategoriesModule { fetchCategories(authToken: string,
filter?: FilterTagCategories): Promise<ResponseDto<FindTagCategories>>;
fetchACategory(authToken: string, id: string):
Promise<ResponseDto<ITagCategory>>; }

================================================ FILE:
src/services/tagCategory/tagCategory.ts
================================================ import Container, { Service }
from "typedi"; import { PaktConnector } from "../../connector"; import {
API_PATHS, ErrorUtils, ResponseDto, Status, parseUrlWithQuery } from
"../../utils"; import { FilterTagCategories, FindTagCategories, ITagCategory,
TagCategoriesModule } from "./tagCategory.dto";

@Service({ factory: (data: { id: string }) => { return new
TagCategoryModule(data.id); }, transient: true, }) export class
TagCategoryModule implements TagCategoriesModule { private id: string; private
connector: PaktConnector; constructor(id: string) { this.id = id; this.connector
= Container.of(this.id).get(PaktConnector); }

fetchCategories( authToken: string, filter?: FilterTagCategories | undefined, ):
Promise<ResponseDto<FindTagCategories>> { return ErrorUtils.newTryFail(async ()
=> { const url = `${API_PATHS.FETCH_CATEGORIES}`; const fetchUrl =
parseUrlWithQuery(url, filter); const response: ResponseDto<FindTagCategories> =
await this.connector.get({ path: fetchUrl, authToken }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); } fetchACategory(authToken:
string, id: string): Promise<ResponseDto<ITagCategory>> { return
ErrorUtils.newTryFail(async () => { const url =
`${API_PATHS.FETCH_CATEGORIES_BY_ID}/${id}`; const response:
ResponseDto<ITagCategory> = await this.connector.get({ path: url, authToken });
if (Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); } }

================================================ FILE:
src/services/upload/index.ts ================================================
export \* from "./upload";

================================================ FILE:
src/services/upload/upload.dto.ts
================================================ import { ResponseDto } from
"../../utils/response";

interface UploadedUser { profile: { talent: { tags: string[]; availability:
string; tagsIds: object[]; }; }; \_id: string; firstName: string; lastName:
string; type: string; score: number; }

export interface CreateFileUpload { file: Object; }

export interface IUploadDto { \_id: string; name: string; uploaded_by:
UploadedUser | string; url: string; meta: Record<string, any> | undefined;
status: boolean; createdAt?: string | Date; deletedAt?: string | Date;
updatedAt?: string | Date; }

export interface FindUploadDto { count: number; pages: number; data:
IUploadDto[]; }

export type FilterUploadDto = | ({ page?: string; limit?: string; } &
IUploadDto) | any;

export interface UploadModuleType { fileUpload(authToken: string, payload:
CreateFileUpload): Promise<ResponseDto<IUploadDto>>; getFileUploads(authToken:
string, filter?: FilterUploadDto): Promise<ResponseDto<FindUploadDto>>;
getAFileUpload(authToken: string, id: string): Promise<ResponseDto<IUploadDto>>;
}

================================================ FILE:
src/services/upload/upload.ts ================================================
import Container, { Service } from "typedi"; import { PaktConnector } from
"../../connector"; import { API_PATHS } from "../../utils/constants"; import {
ErrorUtils, ResponseDto, Status, parseUrlWithQuery } from
"../../utils/response"; import { CreateFileUpload, FilterUploadDto,
FindUploadDto, IUploadDto, UploadModuleType } from "./upload.dto"; export \*
from "./upload.dto";

@Service({ factory: (data: { id: string }) => { return new
UploadModule(data.id); }, transient: true, }) export class UploadModule
implements UploadModuleType { private id: string; private connector:
PaktConnector;

constructor(id: string) { this.id = id; this.connector =
Container.of(this.id).get(PaktConnector); }

fileUpload(authToken: string, payload: CreateFileUpload):
Promise<ResponseDto<IUploadDto>> { const credentials = { ...payload }; return
ErrorUtils.newTryFail(async () => { const response: ResponseDto<IUploadDto> =
await this.connector.post({ path: API_PATHS.FILE_UPLOAD, body: credentials,
authToken, }); if (Number(response.statusCode || response.code) > 226 ||
response.status === Status.ERROR) return response; return response; }); }

getFileUploads(authToken: string, filter: FilterUploadDto):
Promise<ResponseDto<FindUploadDto>> { return ErrorUtils.newTryFail(async () => {
const theFilter = filter ? filter : {}; const fetchUrl =
parseUrlWithQuery(API_PATHS.FILE_UPLOAD, theFilter); const url = filter ?
API_PATHS.FILE_UPLOAD : fetchUrl;

      const response: ResponseDto<FindUploadDto> = await this.connector.get({
        path: url,
        authToken,
      });
      if (Number(response.statusCode || response.code) > 226 || response.status === Status.ERROR) return response;
      return response;
    });

} getAFileUpload(authToken: string, id: string):
Promise<ResponseDto<IUploadDto>> { return ErrorUtils.newTryFail(async () => {
const response: ResponseDto<IUploadDto> = await this.connector.get({ path:
`${API_PATHS.FILE_UPLOAD}${id}`, authToken, }); if (Number(response.statusCode
|| response.code) > 226 || response.status === Status.ERROR) return response;
return response; }); } }

================================================ FILE:
src/services/userVerification/index.ts
================================================ export \* from
"./userVerification";

================================================ FILE:
src/services/userVerification/userVerification.dto.ts
================================================ import { ResponseDto } from
"../../utils"; import { expectedISOCountries } from "../../utils/constants";

export type VerificationDocumentTypes = | "PASSPORT" | "ID_CARD" |
"RESIDENCE_PERMIT" | "DRIVERS_LICENSE" | "VISA" | "OTHER";

export interface ICreateSessionPayload { firstName: string; lastName: string;
gender: "M" | "F"; country: expectedISOCountries; fullAddress: string;
documentType: VerificationDocumentTypes; documentNumber: string; dateOfBirth:
string; }

export interface ISendSessionMedia { context: "face" | "document-front" |
"document-back"; file: object; }

export interface IVerification { \_id: string; owner: string; sessionID?:
string; sessionToken?: string; verificationID?: string; providerCreatedTime?:
string; type?: string; status?: IVerificationStatus; verificationMetaData?:
Record<string, any>; country?: string; documentType?: string;
documentValidFrom?: string; documentValidUntil?: string; providerReason?:
string; providerReasonCode?: number; mediaId?: string; mediaMimeType?: string;
mediaUrl?: string; createdAt?: string | Date; deletedAt?: string | Date;
updatedAt?: string | Date; }

export type IVerificationStatus = | "created" | "approved" |
"resubmission_requested" | "declined" | "expired" | "abandoned" | "submitted" |
"review";

export interface CreateSessionResponse { status: string; verification: { id:
string; url: string; vendorData: string; host: string; status:
IVerificationStatus; sessionToken: string; }; }

export interface SendSessionMediaResponse { status: IVerificationStatus; image:
{ context: "face" | "document-front" | "document-back"; id: string; name:
string; timestamp: null; size: number; mimetype: string; url: string; }; }

export interface SessionAttempts { status: "success"; verifications:
IVerification[]; }

export interface UserVerificationModuleType { createSession(authToken: string,
payload: ICreateSessionPayload): Promise<ResponseDto<CreateSessionResponse>>;
sendSessionMedia(authToken: string, payload: ISendSessionMedia):
Promise<ResponseDto<SendSessionMediaResponse>>; getSessionAttempts(authToken:
string): Promise<ResponseDto<SessionAttempts>>; getUserVerifications(authToken:
string): Promise<ResponseDto<IVerification[]>>; }

================================================ FILE:
src/services/userVerification/userVerification.ts
================================================ import Container, { Service }
from "typedi"; import { PaktConnector } from "../../connector/connector"; import
{ API_PATHS, ErrorUtils, ResponseDto, Status, parseUrlWithQuery } from
"../../utils"; import { CreateSessionResponse, ICreateSessionPayload,
ISendSessionMedia, IVerification, SendSessionMediaResponse, SessionAttempts,
UserVerificationModuleType, } from "./userVerification.dto";

export \* from "./userVerification.dto";

@Service({ factory: (data: { id: string }) => { return new
UserVerificationModule(data.id); }, transient: true, }) export class
UserVerificationModule implements UserVerificationModuleType { private id:
string; private connector: PaktConnector;

constructor(id: string) { this.id = id; this.connector =
Container.of(this.id).get(PaktConnector); }

createSession(authToken: string, payload: ICreateSessionPayload):
Promise<ResponseDto<CreateSessionResponse>> { const credentials = { ...payload
}; return ErrorUtils.newTryFail(async () => { const response:
ResponseDto<CreateSessionResponse> = await this.connector.post({ path:
API_PATHS.CREATE_SESSION, body: credentials, authToken, }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); }

sendSessionMedia(authToken: string, payload: ISendSessionMedia):
Promise<ResponseDto<SendSessionMediaResponse>> { const credentials = {
...payload }; return ErrorUtils.newTryFail(async () => { const response:
ResponseDto<SendSessionMediaResponse> = await this.connector.post({ path:
API_PATHS.SEND_SESSION_MEDIA, body: credentials, authToken, }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); }

getSessionAttempts(authToken: string): Promise<ResponseDto<SessionAttempts>> {
const fetchUrl = parseUrlWithQuery(API_PATHS.SESSION_ATTEMPTS, null); return
ErrorUtils.newTryFail(async () => { const response: ResponseDto<SessionAttempts>
= await this.connector.get({ path: fetchUrl, authToken, }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); }

getUserVerifications(authToken: string): Promise<ResponseDto<IVerification[]>> {
const fetchUrl = parseUrlWithQuery(API_PATHS.USER_VERIFICATION, null); return
ErrorUtils.newTryFail(async () => { const response: ResponseDto<IVerification[]>
= await this.connector.get({ path: fetchUrl, authToken, }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); } }

================================================ FILE:
src/services/wallet/index.ts ================================================
export \* from "./wallet";

================================================ FILE:
src/services/wallet/wallet.dto.ts
================================================ import { ResponseDto } from
"../../utils/response";

interface WalletUser { profile: { talent: { tags: string[]; availability:
string; tagsIds: object[]; }; }; \_id: string; firstName: string; lastName:
string; type: string; score: number; }

enum IWalletStatus { ACTIVE = "active", DEACTIVATED = "deactivated", BLOCKED =
"blocked", }

enum ITransactionStatus { PENDING = "pending", PROCESSING = "processing",
COMPLETED = "completed", FAILED = "failed", }

enum ITransactionMethod { SENT = "sent", DEPOSIT = "deposit", WITHDRAWAL =
"withdrawal", RECIEVED = "recieved", ESCROW = "escrow", JOBPAYOUT =
"job-payout", FEEPAYOUT = "fee-payout", }

export type ITransactionType = "sent" | "deposit" | "withdrawal" | "recieved" |
"escrow" | "job-payout" | "fee-payout";

export interface IWalletExchangeDto { avax: number; [key: string]: number; }

export interface IWalletDto { \_id: string; owner: WalletUser; amount: number |
string; ledger: number; lock: number; lockedUsd: number; usdValue: number;
usdRate: number; spendable: number; address: string; coin: string; walletId:
string; walletData: string; status: IWalletStatus; prod: boolean; isSystem:
boolean; createdAt?: string | Date; deletedAt?: string | Date; updateAt?: string
| Date; }

export interface ISingleWalletDto { \_id: string; coin: string; amount: number;
usdValue: number; icon: string; address: string; }

export interface IWalletResponseDto { totalBalance: number; value: number;
wallets: IWalletDto[]; }

export interface IWalletBalanceDto { balance: number; }

export interface ITransactionDto { \_id: string; owner: WalletUser; amount:
number; sender: string; reciever: string; currency: string; usdValue: number;
description: string; tx: string; type: ITransactionType; hash: string; method:
ITransactionMethod; status: ITransactionStatus; createdAt?: string | Date;
deletedAt?: string | Date; updatedAt?: string | Date; }

export type FindTransactionsDto = { page: number; pages: number; total: number;
limit: number; transactions: ITransactionDto[]; };

export type ITransactionStatsFormat = "weekly" | "monthly" | "yearly";

export interface ITransactionStatsDto { \_id: number; count: number; date?:
string; }

export interface AggTxns { type: string; amount: number; date: string; }

export interface WalletModuleType { getExchange(authToken: string):
Promise<ResponseDto<IWalletExchangeDto>>; getTransactions(authToken: string):
Promise<ResponseDto<FindTransactionsDto>>; getATransaction(authToken: string,
id: string): Promise<ResponseDto<ITransactionDto>>;
getTransactionStats(authToken: string, format: ITransactionStatsFormat):
Promise<ResponseDto<ITransactionStatsDto[]>>;
getAggregateTransactionStats(authToken: string):
Promise<ResponseDto<AggTxns[]>>; getWallets(authToken: string):
Promise<ResponseDto<IWalletResponseDto>>; getSingleWalletById(authToken: string,
id: string): Promise<ResponseDto<ISingleWalletDto>>;
getSingleWalletByCoin(authToken: string, coin: string):
Promise<ResponseDto<ISingleWalletDto>>; }

================================================ FILE:
src/services/wallet/wallet.ts ================================================
import Container, { Service } from "typedi"; import { PaktConnector } from
"../../connector"; import { API_PATHS } from "../../utils/constants"; import {
ErrorUtils, ResponseDto, Status } from "../../utils/response"; import { AggTxns,
FindTransactionsDto, ISingleWalletDto, ITransactionDto, ITransactionStatsDto,
IWalletExchangeDto, IWalletResponseDto, WalletModuleType, } from "./wallet.dto";
export \* from "./wallet.dto";

@Service({ factory: (data: { id: string }) => { return new
WalletModule(data.id); }, }) export class WalletModule implements
WalletModuleType { private id: string; private connector: PaktConnector;

constructor(id: string) { this.id = id; this.connector =
Container.of(this.id).get(PaktConnector); }

getTransactions(authToken: string): Promise<ResponseDto<FindTransactionsDto>> {
return ErrorUtils.newTryFail(async () => { const response:
ResponseDto<FindTransactionsDto> = await this.connector.get({ path:
API_PATHS.TRANSACTIONS, authToken, }); if (Number(response.statusCode ||
response.code) > 226 || response.status === Status.ERROR) return response;
return response; }); } getATransaction(authToken: string, id: string):
Promise<ResponseDto<ITransactionDto>> { return ErrorUtils.newTryFail(async () =>
{ const response: ResponseDto<ITransactionDto> = await this.connector.get({
path: `${API_PATHS.A_TRANSACTION}/${id}`, authToken, }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); }
getTransactionStats(authToken: string):
Promise<ResponseDto<ITransactionStatsDto[]>> { return
ErrorUtils.newTryFail(async () => { const response:
ResponseDto<ITransactionStatsDto[]> = await this.connector.get({ path:
API_PATHS.TRANSACTION_STATS, authToken, }); if (Number(response.statusCode ||
response.code) > 226 || response.status === Status.ERROR) return response;
return response; }); } getAggregateTransactionStats(authToken: string):
Promise<ResponseDto<AggTxns[]>> { return ErrorUtils.newTryFail(async () => {
const response: ResponseDto<AggTxns[]> = await this.connector.get({ path:
API_PATHS.TRANSACTION_AGGREGATE_STATS, authToken, }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); } getWallets(authToken:
string): Promise<ResponseDto<IWalletResponseDto>> { return
ErrorUtils.newTryFail(async () => { const response:
ResponseDto<IWalletResponseDto> = await this.connector.get({ path:
API_PATHS.WALLETS, authToken, }); if (Number(response.statusCode ||
response.code) > 226 || response.status === Status.ERROR) return response;
return response; }); } getSingleWalletById(authToken: string, id: string):
Promise<ResponseDto<ISingleWalletDto>> { return ErrorUtils.newTryFail(async ()
=> { const response: ResponseDto<ISingleWalletDto> = await this.connector.get({
path: `${API_PATHS.SINGLE_WALLET_BY_ID}/${id}`, authToken, }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); }
getSingleWalletByCoin(authToken: string, coin: string):
Promise<ResponseDto<ISingleWalletDto>> { return ErrorUtils.newTryFail(async ()
=> { const response: ResponseDto<ISingleWalletDto> = await this.connector.get({
path: `${API_PATHS.SINGLE_WALLET_BY_COIN}/${coin}`, authToken, }); if
(Number(response.statusCode || response.code) > 226 || response.status ===
Status.ERROR) return response; return response; }); }

async getExchange(authToken: string): Promise<ResponseDto<IWalletExchangeDto>> {
return ErrorUtils.newTryFail(async () => { const response:
ResponseDto<IWalletExchangeDto> = await this.connector.get({ path:
API_PATHS.TRANSACTION_EXCHANGE, authToken, }); if (Number(response.statusCode ||
response.code) > 226 || response.status === Status.ERROR) return response;
return response; }); } }

================================================ FILE:
src/services/withdrawal/index.ts
================================================ export \* from "./withdrawal";

================================================ FILE:
src/services/withdrawal/withdrawal.dto.ts
================================================ import { ResponseDto } from
"../../utils/response"; import { IUser } from "../auth";

export interface CreateWithdrawal { coin: string; amount: number; address:
string; password: string; }

export interface FilterWithdrawal { page?: number; limit?: number; owner:
string; }

export type FindWithdrawalsDto = { page: number; pages: number; total: number;
data: IWithdrawalDto[]; };

interface ITransactionDto { \_id: string; owner: IUser | string; amount: number;
sender: string; reciever: IUser | string; currency: string; usdValue: number;
description: string; tx: string; type: string; hash: string; method: string;
status: string; data?: string; createdAt?: string | Date; deletedAt?: string |
Date; updatedAt?: string | Date; }

export type IWithdrawalStatus = "pending" | "processing" | "completed" |
"failed";

export interface IWithdrawalDto { \_id: string; owner: string | IUser; txId:
string | ITransactionDto; chainTxId: string; coin: string; address: string;
amount: number; usdValue: number; usdRate: number; status: IWithdrawalStatus; }

export interface WithdrawalModuleType { createWithdrawal(authToken: string,
payload: CreateWithdrawal): Promise<ResponseDto<IWithdrawalDto>>;
fetchWithdrawal(authToken: string, filter: FilterWithdrawal):
Promise<ResponseDto<FindWithdrawalsDto>>; }

================================================ FILE:
src/services/withdrawal/withdrawal.ts
================================================ import Container, { Service }
from "typedi"; import { PaktConnector } from "../../connector"; import {
API_PATHS } from "../../utils/constants"; import { ErrorUtils, ResponseDto,
Status, parseUrlWithQuery } from "../../utils/response"; import {
CreateWithdrawal, FilterWithdrawal, FindWithdrawalsDto, IWithdrawalDto,
WithdrawalModuleType, } from "./withdrawal.dto";

export \* from "./withdrawal.dto";

@Service({ factory: (data: { id: string }) => { return new
WithdrawalModule(data.id); }, }) export class WithdrawalModule implements
WithdrawalModuleType { private id: string; private connector: PaktConnector;

constructor(id: string) { this.id = id; this.connector =
Container.of(this.id).get(PaktConnector); }

createWithdrawal(authToken: string, payload: CreateWithdrawal):
Promise<ResponseDto<IWithdrawalDto>> { return ErrorUtils.newTryFail(async () =>
{ const requestBody = { ...payload }; const response:
ResponseDto<IWithdrawalDto> = await this.connector.post({ path:
API_PATHS.CREATE_WITHDRAWAL, body: requestBody, authToken, }); return response;
}); }

fetchWithdrawal(authToken: string, filter: FilterWithdrawal):
Promise<ResponseDto<FindWithdrawalsDto>> { const fetchUrl =
parseUrlWithQuery(API_PATHS.FETCH_WITHDRAWALS, filter); return
ErrorUtils.newTryFail(async () => { const response:
ResponseDto<FindWithdrawalsDto> = await this.connector.get({ path: fetchUrl,
authToken, }); if (Number(response.statusCode || response.code) > 226 ||
response.status === Status.ERROR) return response; return response; }); } }

================================================ FILE: src/utils/config.ts
================================================ export interface PaktConfig {
baseUrl: string; testnet?: boolean; verbose?: boolean; }

================================================ FILE: src/utils/constants.ts
================================================ // Please note that some of
these endpoints can be enabled or disabled according to policy settings on your
Chainsite dashboard. Ensure the endpoint you want to utilize has its policy
settings enabled.

export const CHARACTERS =
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const API_PATHS = { API_VERSION: "/v1", // Authentication endpoints
LOGIN: "/auth/login", REGISTER: "/auth/create-account", ACCOUNT_VERIFY:
"/auth/account/verify", RESEND_VERIFY_LINK: "/auth/verify/resend",
VALIDATE_PASSWORD_TOKEN: "/auth/validate/password", RESET_PASSWORD:
"/auth/password/reset", CHANGE_PASSWORD: "/auth/password/change",
VALIDATE_REFERRAL: "/auth/referral/validate/", GOOGLE_OAUTH_GENERATE_STATE:
"/auth/google/oauth/generate-state", GOOGLE_OAUTH_VALIDATE_STATE:
"/auth/google/oauth/validate-state",

// Collection endpoints COLLECTION: "/collection", COLLECTION_TYPE:
"/collection-type", COLLECTION_MANY: "/collection/many", COLLECTION_UPDATE:
"/collection",

// Bookmark endpoints BOOKMARK: "/bookmark",

// Notifications NOTIFICATION_FETCH: "/notifications/", NOTIFICATION_MARK_ALL:
"/notifications/mark/all", NOTIFICATION_MARK_ONE: "/notifications/mark",

// Manage Account and settings ACCOUNT: "/account", ACCOUNT_ONBOARD:
"/account/onboard", ACCOUNT_UPDATE: "/account/update", ACCOUNT_PASSWORD:
"/account/password/change", ACCOUNT_TWO_INIT: "/account/initiate/2fa",
ACCOUNT_TWO_ACTIVATE: "/account/activate/2fa", ACCOUNT_TWO_DEACTIVATE:
"/account/deactivate/2fa", ACCOUNT_FETCH_ALL: "/account/user",
ACCOUNT_FETCH_SINGLE: "/account/user/", ACCOUNT_LOGOUT: "/account/logout",
ACCOUNT_SEND_EMAIL_TWO_FA: "/account/2fa/email",

//transaction endpoints TRANSACTIONS: "/transaction/", A_TRANSACTION:
"/transaction", TRANSACTION_STATS: "/transaction/stats",
TRANSACTION_AGGREGATE_STATS: "/transaction/aggregate/stats",
TRANSACTION_EXCHANGE: "/transaction/exchange",

// Wallet Endpoints WALLETS: "/wallet/", SINGLE_WALLET_BY_ID: "/wallet/",
SINGLE_WALLET_BY_COIN: "/wallet/coin",

// File Upload FILE_UPLOAD: "/upload/",

// Review ADD_REVIEW: "/reviews/", GET_REVIEW: "/reviews/",

//Withdrawal CREATE_WITHDRAWAL: "/withdrawals/", FETCH_WITHDRAWALS:
"/withdrawals/",

//User Verification CREATE_SESSION: "/user-verification/veriff/session/new",
SEND_SESSION_MEDIA: "/user-verification/veriff/session/media", SESSION_ATTEMPTS:
"/user-verification/veriff/session/attempts", USER_VERIFICATION:
"/user-verification/user", DELETE_SESSION:
"/user-verification/veriff/session/delete",

//Chat GET_USER_MESSAGES: "/chat/",

//Connection Filter CREATE_CONNECTION_FILTER: "/conn-filter/",
GET_CONNECTION_FILTER: "/conn-filter/user", UPDATE_CONNECTION_FILTER:
"/conn-filter/",

//Invite SEND_INVITE: "/invite/", ACCEPT_INVITE: "/invite", DECLINE_INVITE:
"/invite", VIEW_ALL_INVITE: "/invite/", VIEW_A_INVITE: "/invite/",
CANCEL_AN_INVITE: "/invite/",

//Feeds FEEDS: "/feeds", FEEDS_DISMISS_ONE: "/dismiss", FEEDS_DISMISS_ALL:
"/feeds/dismiss/all",

//Payment CREATE_ORDER: "/payment/", VALIDATE_ORDER: "/payment/validate",
RELEASE_ORDER: "/payment/release", PAYMENT_METHODS: "/payment/coins", RPC:
"/payment/rpc",

//Referrals endpoint FETCH_USER_REFERRALS: "/referrals/",
FETCH_USER_REFERRAL_STATS: "/referrals/stats", SEND_REFERRALS_INVITE:
"/referrals/invite",

//Tags-category endpoint FETCH_CATEGORIES: "/tag-category/",
FETCH_CATEGORIES_BY_ID: "/tag-category",

//Direct Deposit endpoints CREATE_DIRECT_DEPOSIT:
"/payment-public/direct-deposit", VALIDATE_DIRECT_DEPOSIT:
"/payment-public/validate", FETCH_PAYMENT_METHODS: "/payment-public/coins",
FETCH_ACTIVE_RPC: "/payment-public/rpc", }; export interface IModel { \_id?:
string; createdAt?: string; updatedAt?: string; deletedAt?: string; }

export type expectedISOCountries = | "AW" | "AF" | "AO" | "AI" | "AX" | "AL" |
"AD" | "AE" | "AR" | "AM" | "AS" | "AG" | "AU" | "AT" | "AZ" | "BI" | "BE" |
"BJ" | "BF" | "BD" | "BG" | "BH" | "BS" | "BA" | "BL" | "BY" | "BZ" | "BM" |
"BO" | "BR" | "BB" | "BN" | "BT" | "BW" | "CF" | "CA" | "CC" | "CH" | "CL" |
"CN" | "CI" | "CM" | "CD" | "CD" | "CG" | "CK" | "CO" | "KM" | "CI" | "CV" |
"CR" | "CU" | "CW" | "CX" | "KY" | "CY" | "CZ" | "DE" | "DJ" | "DM" | "DK" |
"DO" | "DO" | "DO" | "DZ" | "EC" | "EG" | "ER" | "EH" | "ES" | "EE" | "ET" |
"FI" | "FJ" | "FK" | "FR" | "FO" | "FM" | "GA" | "GB" | "GE" | "GG" | "GH" |
"GI" | "GN" | "GP" | "GM" | "GW" | "GQ" | "GR" | "GD" | "GL" | "GT" | "GF" |
"GU" | "GY" | "HK" | "HN" | "HR" | "HT" | "HU" | "ID" | "IM" | "IN" | "IO" |
"IE" | "IR" | "IQ" | "IS" | "IL" | "IT" | "JM" | "JE" | "JO" | "JP" | "KZ" |
"KZ" | "KE" | "KG" | "KH" | "KI" | "KN" | "KR" | "XK" | "KW" | "LA" | "LB" |
"LR" | "LY" | "LC" | "LI" | "LK" | "LS" | "LT" | "LU" | "LV" | "MO" | "MF" |
"MA" | "MC" | "MD" | "MG" | "MV" | "MX" | "MH" | "MK" | "ML" | "MT" | "MM" |
"ME" | "MN" | "MP" | "MZ" | "MR" | "MS" | "MQ" | "MU" | "MW" | "MY" | "YT" |
"NA" | "NC" | "NE" | "NF" | "NG" | "NI" | "NU" | "NL" | "NO" | "NP" | "NR" |
"NZ" | "OM" | "PK" | "PA" | "PN" | "PE" | "PH" | "PW" | "PG" | "PL" | "PR" |
"PR" | "KP" | "PT" | "PY" | "PS" | "PF" | "QA" | "RE" | "RO" | "RU" | "RW" |
"SA" | "SD" | "SN" | "SG" | "GS" | "SJ" | "SB" | "SL" | "SV" | "SM" | "SO" |
"PM" | "RS" | "SS" | "ST" | "SR" | "SK" | "SI" | "SE" | "SZ" | "SX" | "SC" |
"SY" | "TC" | "TD" | "TG" | "TH" | "TJ" | "TK" | "TM" | "TL" | "TO" | "TT" |
"TN" | "TR" | "TV" | "TW" | "TZ" | "UG" | "UA" | "UY" | "US" | "UZ" | "VA" |
"VA" | "VC" | "VE" | "VG" | "VI" | "VN" | "VU" | "WF" | "WS" | "YE" | "ZA" |
"ZM" | "ZW";

================================================ FILE: src/utils/index.ts
================================================ export _ from "./config";
export _ from "./constants"; export _ from "./response"; export _ from
"./token";

================================================ FILE: src/utils/response.ts
================================================ import { backOff } from
"./backOff/backoff";

export enum Status { SUCCESS = "success", ERROR = "error", }

export interface ResponseDto<T> { data: T; status: Status; message?: string;
code?: string; statusCode?: number; validation?: Record<string, any>; }

export type IAny = any;

type ErrorWithMessage = { message: string[] | object[] | any; code?: string; };

export const ErrorUtils = { // tryFail: async <T>(f: (() => Promise<T>) | (() =>
T)): Promise<ResponseDto<T>> => { // try { // const data = await f(); // return
{ // data, // status: Status.SUCCESS, // }; // } catch (e) { // const parseErr =
ErrorUtils.toErrorWithMessage(e); // return { // data: null as unknown as T, //
status: Status.ERROR, // message: parseErr ? parseErr.message : ["Internal
Server Error"], // code: parseErr.code, // }; // } // }, // tryWithBackOff:
async <T>(f: (() => Promise<T>) | (() => T)): Promise<T> => { // try { // const
response = await backOff( // async () => { // return await
ErrorUtils.newTryFail(f); // }, // { // startingDelay: 5, // timeMultiple: 10,
// numOfAttempts: 4, // maxDelay: 250, // delayFirstAttempt: false, // }, // );
// return response; // } catch (e) { // const parseErr =
ErrorUtils.toErrorWithMessage(e); // return { // data: null as unknown as T, //
status: Status.ERROR, // message: parseErr ? parseErr.message : ["Internal
Server Error"], // code: parseErr.code, // } as unknown as T; // } // },
newTryFail: async <T>(f: (() => Promise<T>) | (() => T)): Promise<T> => { try {
const data = await backOff( async () => { return await f(); }, { startingDelay:
5, timeMultiple: 10, numOfAttempts: 4, maxDelay: 250, delayFirstAttempt: false,
}, );

      return { ...data };
    } catch (e) {
      const parseErr = ErrorUtils.toErrorWithMessage(e);
      return {
        data: null as unknown as T,
        status: Status.ERROR,
        message: parseErr ? parseErr.message : ["Internal Server Error"],
        code: parseErr.code,
      } as unknown as T;
    }

}, formatErrorMsg: (message: string) => { return message.replace("attr.", "");
}, toErrorWithMessage: (maybeError: unknown): ErrorWithMessage => { if (typeof
maybeError === "string") { try { const error = JSON.parse(maybeError as string);
if (error.data instanceof Array && error.data.length > 0) { return { message:
(error.data as string[]).map((message) => ErrorUtils.formatErrorMsg(message)),
code: error.errorCode, }; }

        return {
          message: [error.message ?? maybeError],
          code: error.errorCode,
        };
        // eslint-disable-next-line no-empty
      } catch (_) {}
    }

    if (ErrorUtils.isErrorWithMessage(maybeError)) {
      return { message: [maybeError.message] };
    }

    try {
      return {
        message: [JSON.stringify(maybeError, null, 2)],
      };
    } catch {
      // fallback in case there's an error stringifying the maybeError
      // like with circular references for example.
      return { message: [String(maybeError)] };
    }

}, isErrorWithMessage(e: unknown): e is ErrorWithMessage { return ( typeof e ===
"object" && e !== null && "message" in e && typeof (e as Record<string,
unknown>).message === "string" ); }, };

export const parseUrlWithQuery = (url: string, filter: object | any) => { let
querys = "?"; const objectKeys = Object.keys(filter || {}); if
(objectKeys.length === 0) return url; objectKeys.map((key, i) => { let
$and = "&";
    if (key === undefined || key === "undefined" || key === null || key === "null" || key.length === 0) {
      querys = querys;
    }
    if (i + 1 === objectKeys.length) {
      $and = "";
    }
    querys = querys + `${key}=${filter[key]}${$and}`;
}); return url + querys; };

================================================ FILE: src/utils/token.ts
================================================ import { Token } from "typedi";
import { PaktConfig } from "./config";

export const PAKT_CONFIG = new Token<PaktConfig>("PAKT_CONFIG"); export const
AUTH_TOKEN = new Token<string>("AUTH_TOKEN"); export const TEMP_TOKEN = new
Token<string>("TEMP_TOKEN");

export const isEmpty = (value: unknown) => { return ( value === null || value
=== undefined || (typeof value === "object" && Object.keys(value).length === 0)
|| (typeof value === "string" && value === "" && value.trim().length === 0) ||
value === "undefined" || value === "null" ); };

================================================ FILE:
src/utils/backOff/backoff.ts ================================================
import { IBackOffOptions, getSanitizedOptions, BackoffOptions } from
"./options"; import { DelayFactory } from "./delay/delay.factory";

export { BackoffOptions, IBackOffOptions };

/\*\*

- Executes a function with exponential backoff.
- @param request the function to be executed
- @param options options to customize the backoff behavior
- @returns Promise that resolves to the result of the `request` function \*/
  export async function backOff<T>( request: () => Promise<T>, options:
  BackoffOptions = {} ): Promise<T> { const sanitizedOptions =
  getSanitizedOptions(options); const backOff = new BackOff(request,
  sanitizedOptions);

return await backOff.execute(); }

class BackOff<T> { private attemptNumber = 0;

constructor( private request: () => Promise<T>, private options: IBackOffOptions
) {}

public async execute(): Promise<T> { while (!this.attemptLimitReached) { try {
await this.applyDelay(); return await this.request(); } catch (e) {
this.attemptNumber++; const shouldRetry = await this.options.retry(e,
this.attemptNumber);

        if (!shouldRetry || this.attemptLimitReached) {
          throw e;
        }
      }
    }

    throw new Error("Something went wrong.");

}

private get attemptLimitReached() { return this.attemptNumber >=
this.options.numOfAttempts; }

private async applyDelay() { const delay = DelayFactory(this.options,
this.attemptNumber); await delay.apply(); } }

================================================ FILE:
src/utils/backOff/options.ts ================================================
/\*\*

- Type of jitter to apply to the delay.
-   - `"none"`: no jitter is applied
-   - `"full"`: full jitter is applied (random value between `0` and `delay`)
      \*/ export type JitterType = "none" | "full";

export type BackoffOptions = Partial<IBackOffOptions>;

export interface IBackOffOptions { /\*\*

- Decides whether the `startingDelay` should be applied before the first call.
- If `false`, the first call will occur without a delay.
- @defaultValue `false` \*/ delayFirstAttempt: boolean; /\*\*
- Decides whether a
  [jitter](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/)
- should be applied to the delay. Possible values are `"full"` and `"none"`.
- @defaultValue `"none"` \*/ jitter: JitterType; /\*\*
- The maximum delay, in milliseconds, between two consecutive attempts.
- @defaultValue `Infinity` \*/ maxDelay: number; /\*\*
- The maximum number of times to attempt the function.
- Must be at least `1`.
- @defaultValue `10` \*/ numOfAttempts: number; /\*\*
- The `retry` function can be used to run logic after every failed attempt (e.g.
  logging a message,
- assessing the last error, etc.).
- It is called with the last error and the upcoming attempt number.
- Returning `true` will retry the function as long as the `numOfAttempts` has
  not been exceeded.
- Returning `false` will end the execution.
- @defaultValue a function that always returns `true`.
- @param e The last error thrown by the function.
- @param attemptNumber The upcoming attempt number.
- @returns `true` to retry the function, `false` to end the execution \*/ retry:
  (e: any, attemptNumber: number) => boolean | Promise<boolean>; /\*\*
- The delay, in milliseconds, before executing the function for the first time.
- @defaultValue `100` \*/ startingDelay: number; /\*\*
- The `startingDelay` is multiplied by the `timeMultiple` to increase the delay
  between reattempts.
- @defaultValue `2` \*/ timeMultiple: number; }

const defaultOptions: IBackOffOptions = { delayFirstAttempt: false, jitter:
"none", maxDelay: Infinity, numOfAttempts: 10, retry: () => true, startingDelay:
100, timeMultiple: 2 };

export function getSanitizedOptions(options: BackoffOptions) { const sanitized:
IBackOffOptions = { ...defaultOptions, ...options };

if (sanitized.numOfAttempts < 1) { sanitized.numOfAttempts = 1; }

return sanitized; }

================================================ FILE:
src/utils/backOff/delay/delay.base.ts
================================================ import { IDelay } from
"./delay.interface"; import { IBackOffOptions } from "../options"; import {
JitterFactory } from "../jitter/jitter.factory";

export abstract class Delay implements IDelay { protected attempt = 0;
constructor(private options: IBackOffOptions) {}

public apply() { return new Promise(resolve => setTimeout(resolve,
this.jitteredDelay)); }

public setAttemptNumber(attempt: number) { this.attempt = attempt; }

private get jitteredDelay() { const jitter = JitterFactory(this.options); return
jitter(this.delay); }

private get delay() { const constant = this.options.startingDelay; const base =
this.options.timeMultiple; const power = this.numOfDelayedAttempts; const delay
= constant \* Math.pow(base, power);

    return Math.min(delay, this.options.maxDelay);

}

protected get numOfDelayedAttempts() { return this.attempt; } }

================================================ FILE:
src/utils/backOff/delay/delay.factory.ts
================================================ import { IBackOffOptions } from
"../options"; import { SkipFirstDelay } from "./skip-first/skip-first.delay";
import { AlwaysDelay } from "./always/always.delay"; import { IDelay } from
"./delay.interface";

export function DelayFactory(options: IBackOffOptions, attempt: number): IDelay
{ const delay = initDelayClass(options); delay.setAttemptNumber(attempt); return
delay; }

function initDelayClass(options: IBackOffOptions) { if
(!options.delayFirstAttempt) { return new SkipFirstDelay(options); }

    return new AlwaysDelay(options);

}

================================================ FILE:
src/utils/backOff/delay/delay.interface.ts
================================================ export interface IDelay {
apply: () => Promise<unknown>; setAttemptNumber: (attempt: number) => void; }

================================================ FILE:
src/utils/backOff/delay/always/always.delay.ts
================================================ import { Delay } from
"../delay.base";

export class AlwaysDelay extends Delay {}

================================================ FILE:
src/utils/backOff/delay/skip-first/skip-first.delay.ts
================================================ import { Delay } from
"../delay.base";

export class SkipFirstDelay extends Delay { public async apply() { return
this.isFirstAttempt ? true : super.apply(); }

    private get isFirstAttempt() {
        return this.attempt === 0;
    }

    protected get numOfDelayedAttempts() {
        return this.attempt - 1;
    }

}

================================================ FILE:
src/utils/backOff/jitter/jitter.factory.ts
================================================ import { IBackOffOptions } from
"../options"; import { fullJitter } from "./full/full.jitter"; import { noJitter
} from "./no/no.jitter";

export type Jitter = (delay: number) => number;

export function JitterFactory(options: IBackOffOptions): Jitter { switch
(options.jitter) { case "full": return fullJitter;

    case "none":
    default:
      return noJitter;

} }

================================================ FILE:
src/utils/backOff/jitter/full/full.jitter.ts
================================================ export function
fullJitter(delay: number) { const jitteredDelay = Math.random() \* delay; return
Math.round(jitteredDelay); }

================================================ FILE:
src/utils/backOff/jitter/no/no.jitter.ts
================================================ export function noJitter(delay:
number) { return delay; }
