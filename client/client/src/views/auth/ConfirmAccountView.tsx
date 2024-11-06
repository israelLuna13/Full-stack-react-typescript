import { ActionFunctionArgs, Form, redirect, useActionData } from 'react-router-dom';
import { confirmAccount } from '../../service/AuthService';

import ErrorMessage from '../../components/ErrorMessage';

export async function action({request}:ActionFunctionArgs)
{
  const data = Object.fromEntries(await request.formData())
  let error = ''

  if(Object.values(data).includes(''))
    error ='You most put the code complete'

  if(error)
    return error

  await confirmAccount(data)
  return redirect('/')
}

export default function ConfirmAccountView() {
  
  const error = useActionData() as string

    return (
        <>
          <h1 className="text-4xl font-black text-white">Confirm Account</h1>
          <p className="text-2xl font-light text-white mt-5">
            Put new code that you get {""}
            <span className=" text-blue-500 font-bold">
              {" "}
              for email
            </span>
          </p>
          {error && <ErrorMessage>{error}</ErrorMessage> }

          <Form className="space-y-8 p-10 bg-gray-50  mt-10" method="POST">

             <label htmlFor="token"  className="font-normal text-2xl text-center block">Code of 6 digits</label>
             <input type="number" id='token'
                            className='mt-2 block w-full p-3 bg-gray-50'
                            placeholder='Token'
                            name='token'/>
            <input
              type="submit"
              className="mt-5 w-full bg-blue-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
              value="Sent email"
            />
          </Form>
        </>
      );
}
