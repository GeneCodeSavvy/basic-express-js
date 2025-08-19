import e from "express";

const app = e()

let users = [
    {
        name: "John",
        kidneys: [
            { healthy: false }
        ]
    },
]

const getKidneyStats = () => {
    let totalKidneys = users[0].kidneys.length
    let healthyKidneys = 0
    let unhealthyKidneys = 0

    for (let kidney of users[0].kidneys) {
        kidney.healthy ? healthyKidneys++ : unhealthyKidneys++
    }

    return { totalKidneys, healthyKidneys, unhealthyKidneys }
}

const postKidney = (healthy) => {
    const status = healthy === "true"
    if (users[0].kidneys.length < 2) {
        users[0].kidneys.push({ healthy })
        return users[0].kidneys
    } else {
        return false
    }
}

const putKidney = () => {
    users[0].kidneys.map((kidney) => {
        kidney.healthy = true
    })
}

const deleteKidney = () => {
    users[0].kidneys = users[0].kidneys.filter(kidney => kidney.healthy)
}

app.get("/", (req, res) => {
    const stats = getKidneyStats()
    res.json(stats)
})

app.post("/add/:healthy", (req, res) => {
    const added = postKidney(req.params.healthy)
    if (added) {
        res.json(added, typeof added).status(200)
    } else {
        res.status(400).json({ error: "A person cannot have more than 2 kidneys" })
    }
})

app.put("/", (req, res) => {
    putKidney()
    res.json(getKidneyStats())
})

app.delete("/", (req, res) => {
    deleteKidney()
    res.json(getKidneyStats())
})

app.listen(8080, () => {
    console.log("Server running on port 8080")
})
