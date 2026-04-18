# Security Spec - The Guestbook

## Data Invariants
1. A comment must have a name, text, isSecretMode, and createdAt.
2. The `name` must be less than 30 characters.
3. The `text` must be less than 250 characters.
4. The application explicitly supports anonymous users since it is an ARG guestbook.
5. Comments are immutable; they cannot be updated or deleted.
6. The `createdAt` must exactly match the server timestamp.
7. Any update or delete operation must be rejected.

## The Dirty Dozen Payloads
1. **Missing Name**: Payload without `name`.
2. **Missing Text**: Payload without `text`.
3. **Missing isSecretMode**: Payload without `isSecretMode`.
4. **Missing createdAt**: Payload without `createdAt`.
5. **Name Too Long**: `name` exceeds 30 characters.
6. **Text Too Long**: `text` exceeds 250 characters.
7. **Invalid Type (Name)**: `name` is an array or number.
8. **Invalid Type (isSecretMode)**: `isSecretMode` is a string.
9. **Ghost Field**: Payload includes an extra field like `isAdmin: true`.
10. **Spoofed Timestamp**: `createdAt` is a client-provided past/future timestamp.
11. **Update Attack**: Attempting to update an existing comment's text.
12. **Delete Attack**: Attempting to delete an existing comment.
