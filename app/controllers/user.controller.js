
async function index(req, res) {
    try {
        const users = User.getAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
}

async function getUserById(params) {

}