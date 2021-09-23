export const validateName = (value: string | undefined) => {
    if (!value) {
        return 'Name must not be empty.';
    }
    if (/\s/.test(value)) {
        return 'Name cannot contain spaces.';
    }
    if (value[0] !== value[0].toUpperCase()) {
        return 'Name must start from upper-case letter.';
    }
    return null;
};
