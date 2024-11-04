import { Form } from 'react-router-dom';

export default function RequestNewCode() {
   return (
    <>
      <h1 className="text-4xl font-black text-white">Request new code confirmation</h1>
      <p className="text-2xl font-light text-white mt-5">
    Enter your email for receive {""}
        <span className=" text-blue-500 font-bold">
          {" "}
          new code
        </span>
      </p>
      <Form className="space-y-8 p-10 bg-gray-50  mt-10" method="POST">
      
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="price">
            Email:
          </label>
          <input
            id="price"
            type="email"
             className="w-full p-3  border-gray-300 border"
            placeholder="user@gmail.com"
            name="price"
          />
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
