import bcrypt from "bcryptjs";

const password = "Aadidev@123";

const run = async () => {
  const result = await bcrypt.hash(password, 10); // await the Promise
  console.log(result);
};

run();