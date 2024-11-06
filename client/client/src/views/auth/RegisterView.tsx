import { ActionFunctionArgs, Form, redirect, useActionData } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import { createAccount } from "../../service/AuthService";

//action for create account
export async function action({request}:ActionFunctionArgs)
{
    //get data form
    const data = Object.fromEntries(await request.formData())
    let error=''
    
    //check  if there is not input empty
    if(Object.values(data).includes(''))
        error = 'All input is required'
    
    if(error.length)
        return error

   await  createAccount(data)
    return redirect('/')
}

export default function RegisterView() {
  const error = useActionData() as string

  return (
    <>
      <h1 className="text-4xl font-black text-white">Create account</h1>
      <p className="text-2xl font-light text-white mt-5">
        Complete the form to {""}
        <span className=" text-blue-500 font-bold">
          {" "}
          create your account
        </span>
      </p>
      <Form className="space-y-8 p-10 bg-gray-50  mt-10" method="POST">
      

      <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="price">
            Name:
          </label>
          <input
            id="price"
            type="name"
             className="w-full p-3  border-gray-300 border"
            placeholder="Your name"
            name="name"
          />
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage> }


        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="price">
            Email:
          </label>
          <input
            id="email"
            type="email"
             className="w-full p-3  border-gray-300 border"
            placeholder="user@gmail.com"
            name="email"
          />
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage> }


        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="price">
            Password:
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-3  border-gray-300 border"
            placeholder="Password"
            name="password"
          />
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage> }

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="price">
            Password:
          </label>
          <input
            id="password_confirmation"
            type="password"
            className="w-full p-3  border-gray-300 border"
            placeholder="Password"
            name="password_confirmation"
          />
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage> }

        
        <input
          type="submit"
          className="mt-5 w-full bg-blue-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Create account"
        />
      </Form>
    </>
  );
}
