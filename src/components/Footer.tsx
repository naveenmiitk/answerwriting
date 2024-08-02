import React from 'react'

const Footer = () => {
  return (
    <div className="w-full bg-neutral-900 text-white min-h-[20rem] flex items-start justify-between text-[0.8rem] py-[2rem] bottom-0">
      <div>{/* logo */}</div>
      <div className="flex flex-col space-y-4">
        <h1 className="font-semibold">Peer Review</h1>
        <h1>Question</h1>
        <h1>Help</h1>
        <h1>Chat</h1>
      </div>

      <div className="flex flex-col space-y-4">
        <h1 className="font-semibold">Products</h1>
        <h1>Terms</h1>
        <h1>Advertising</h1>
        <h1>Collectives</h1>
        <h1>Talent</h1>
      </div>

      <div className="flex flex-col space-y-4">
        <h1 className="font-semibold">Company</h1>
        <h1>About</h1>
        <h1>Work Here</h1>
        <h1>Terms and Conditions</h1>
        <h1>Privacy Policy</h1>
        <h1>Contact Us</h1>
        <h1>Cookies Policy</h1>
      </div>
      <div>

      </div>
    </div>
  );
}

export default Footer
