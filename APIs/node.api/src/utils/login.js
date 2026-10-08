function generateNewPassword() {
    const newPassword = (Math.random() + 1)
    .toString(36)
    .substring(2)
    .replace("Z", "@")
    .replace("i", "#")
    .replace("o", "$")
    .replace("n", "$");
    return newPassword;
}

export { generateNewPassword };