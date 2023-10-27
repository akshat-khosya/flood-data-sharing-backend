import { Request, Response } from "express";
import bcrypt from "bcrypt";
import log from "../../utils/logger/log";
import { createUser, findUserByEmail, findUserByPhone } from "../../services";
import { generate } from "generate-password";
import { sendMail } from "../../utils/mail";
import config from "../../lib/config/default";
import { sign } from "../../utils/jwt";

const saltRounds = config.get("saltWorkFactor") as number;

const registerAccount = async (req: Request, res: Response) => {
  try {
    // check existing data
    const checkEmail = await findUserByEmail(req.body.email);
    const checkPhone = await findUserByPhone(req.body.phone);
    if (checkEmail) {
      return res
        .status(401)
        .json({ status: false, msg: "email id already exits" });
    }
    if (checkPhone) {
      return res
        .status(401)
        .json({ status: false, msg: "phone number already exits" });
    }
    // store data service
    const password = generate({ length: 10, numbers: true });
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const response = await createUser({
      email: req.body.email,
      phone: req.body.phone,
      name: req.body.name,
      password: hash,
      role: 2,
    });

    // send password in mail
    sendMail(
      req.body.email,
      "Auto Genrate Password",
      `Welecome to your app. Your Auto Genrate Password is ${password} . Please Do not share your password to anyone.`
    );
    //respond with true status
    return res.status(200).json({ status: true, msg: " Register Sucessfully" });
  } catch (error) {
    log.error(JSON.stringify({ path: "Register Account", error: error }));
    return res.status(500).json({ status: false, msg: error.message });
  }
};

const loginAccount = async (req: Request, res: Response) => {
  try {
    // check email
    const checkEmail = await findUserByEmail(req.body.email);
    if (!checkEmail) {
      return res
        .status(401)
        .json({ status: false, msg: "email id do not exits" });
    }
    // check password
    const result = bcrypt.compare(req.body.password, checkEmail.password);
    if (!result) {
      return res
        .status(401)
        .json({ status: false, msg: "Password did not match" });
    }
    // genrate token
    const token = sign(
      { userId: checkEmail.id },
      { expiresIn: config.get("accessTokenTtl") as string }
    );
    // send data to frotnend
    return res.status(200).json({
      status: true,
      msg: " Login Sucessfully",
      token: token,
      userData: {
        id: checkEmail.id,
        name: checkEmail.name,
        email: checkEmail.email,
        phone: checkEmail.phone,
        role: checkEmail.role,
      },
    });
  } catch (error) {
    log.error(JSON.stringify({ path: "Login Account", error: error }));
    return res.status(500).json({ status: false, msg: error.message });
  }
};
export { registerAccount, loginAccount };
