import {userModel} from '../models/userModel.js'



// add product to user cart
export const addToCart = async (req,res) => {
try {
    const {userId , itemId , size} = req.body

    const userData = await userModel.findById(userId)
    let cartData = await userData.cartData;
    if (cartData[itemId]) {
        if (cartData[itemId][size]) {
            cartData[itemId][size] += 1
        } else {
            cartData[itemId][size] = 1
        }
    } else {
        cartData[itemId] = {}
        cartData[itemId][size] = 1
    }
    await userModel.findByIdAndUpdate(userId,{cartData})
    res.status(200).json({
        message:"added to Cart",
        success:true
    })
} catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message,
        error: true,
      });
}
}

// update user cart
export const updateCart = async (req,res) => {
  try {
    const {userId , itemId, size , quantity} = req.body
    const userData = await userModel.findById(userId)
    let cartData = await userData.cartData;
    cartData[itemId][size] = quantity
    await userModel.findByIdAndUpdate(userId,{cartData})
    res.status(200).json({
        message:" Cart Updated",
        success:true
    }) 
  } catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message,
        error: true,
      });
  }
}

//get user  cart data 
export const getUserCart = async (req,res) => {
      try {
        const {userId} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        res.status(200).json({
            success:true,
            cartData
        })
      } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: true,
          });
      }
}