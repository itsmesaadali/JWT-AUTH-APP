import bcrypt from "bcryptjs";

/**
 * Hashes a plain text password.
 * @param password The plain password
 * @returns The hashed password
 */

export async function hashPassword(password:string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt)
}

/**
 * Compares a candidate password with the stored hashed password.
 * @param candidatePassword The plain password entered by user
 * @param hashedPassword The hashed password from DB
 * @returns true if passwords match, else false
 */

export async function comparePassword(candidatePassword:string, hashedPassword:string):Promise<boolean> {
    return bcrypt.compare(candidatePassword, hashedPassword)
}