const handleNamespace = (io) => {
    const users = {}


    const isAUser = contactName => {
        for (let keys in users)
            if (keys == contactName) return true
        return false
    }


    io.on("connection", (socket) => {

        // for login
        socket.on("log-in", (name) => {
            users[name] = { id: socket.id, contacts: [], groups: [] }
            socket.emit("log-in", { name, id: users[name].id })
        })

        // for adding contact
        socket.on("contact-added", data => {
            if (isAUser(data.contactName)) {
                users[data.name].contacts.push(data.contactName)
                // console.log(users[data.name]);
                socket.emit("contact-added", { name: data.contactName, id: users[data.contactName] })
            }
            else socket.emit("contact-error", "user not avalable")
        })


        socket.on("msg", (data) => {
            const senderId = users[data.user].id
            const receiverId = users[data.contact].id
            // console.log("sender iD: " + senderId + " \n" + "receiver id: " + receiverId)
            socket.to(receiverId).emit("msg", { msg: `${data.user}: ${data.msg}`, id: users[data.user].id })
        })
    })

}

module.exports = { handleNamespace }