import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { Form } from 'react-router-dom';

export default function ConfirmAccountView() {
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
          <Form className="space-y-8 p-10 bg-gray-50  mt-10" method="POST">

             <label className="font-normal text-2xl text-center block">Code of 6 digits</label>

             <div className="flex justify-center gap-5">
            {/*  text fields of text to write the token */}
          <PinInput>
            <PinInputField className="w-10 h-10 p-3 border rounded-lg border-gray-300 placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 border rounded-lg border-gray-300 placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 border rounded-lg border-gray-300 placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 border rounded-lg border-gray-300 placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 border rounded-lg border-gray-300 placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 border rounded-lg border-gray-300 placeholder-white" />
          </PinInput>
        </div>



          
               
            <input
              type="submit"
              className="mt-5 w-full bg-blue-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
              value="Sent email"
            />
          </Form>
        </>
      );
}
