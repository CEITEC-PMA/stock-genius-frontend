const now = new Date();
const deadline = new Date("2023-10-20T23:59:59");

export const isOutOfDeadline = deadline <= now;
