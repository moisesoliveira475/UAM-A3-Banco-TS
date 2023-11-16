"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rules_unit_testing_1 = require("@firebase/rules-unit-testing");
const firestore_1 = require("firebase/firestore");
const testEnv = (0, rules_unit_testing_1.initializeTestEnvironment)({
    firestore: firestoreApp,
    projectId: "uam-bank",
});
const firestoreApp = (0, firestore_1.getFirestore)(testEnv);
describe("User", () => {
    it("should fail if user is not authenticated", async () => {
        const coll = (0, firestore_1.collection)(firestoreApp, "/users");
        const testDoc = (0, firestore_1.doc)(coll, "test");
        await (0, rules_unit_testing_1.assertFails)((0, firestore_1.getDoc)(testDoc));
    });
});
//# sourceMappingURL=login.test.js.map