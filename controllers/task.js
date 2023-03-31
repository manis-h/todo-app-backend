import Task from "../models/task.js";

export const newTask = async (req, res) => {
    const { title, description } = req.body;
    await Task.create({
        title,
        description,
        user: req.user
    })
    res.status(201).json({
        success: true,
        message: "task created suucessfully"
    })
}

export const getMytask = async (req, res, next) => {
    const userid = await req.user._id


    const tasks = await Task.find({ user: userid })
    res.status(201).json({
        success: true,
        tasks
    })

}


export const updateTask = async (req, res, next) => {
    const {id} = req.params
    const task = await Task.findById(id)
    
    if(!task) return res.status(404).json({message:"wrong id"})
        task.isCompleted=!task.isCompleted
        
        await task.save()
        
        res.status(201).json({
            success: true,
            message:"task updated"
        })
    

}   

export const deleteTask = async (req, res, next) => {
    const {id} = req.params
    const task = await Task.findById(id)
    
    if(!task) return res.status(404).json({message:"wrong id"})
        await task.deleteOne()
        res.status(201).json({
            success: true,
            message:"task deleted"
        })
    


}   
