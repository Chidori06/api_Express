const userInfo = {
    id: true,
    lastname: true,
    firstname: true,
    email: true,
    role: {
        select: {
            id: true,
            label: true,
        },
    },
};

export default userInfo