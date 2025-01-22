

export async function checkUser(req, res, next) {

    const {role} = req.params

    if (role === "user") {
        next()
    }

    else{
        return res.json({
            status: false,
            message: "Admin can't access it!!"
        })
    }
}

export async function checkAdmin(req, res, next) {

    const {role} = req.params

    if (role === "admin") {
        next()
    }

    else{
        return res.json({
            status: false,
            message: "User can't access it!!"
        })
    }
}