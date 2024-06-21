import Footer from "../home/foother";
import Nav from "../home/nav";
import bannerImage from "../img/Main_Banner3.jpg"

const ContactUs = () => {
  return (
    <>
      <Nav />

      <div className="mt-28"></div>
      <div className="flex flex-col px-[120px] justify-center content-center gap-10">
        <div className=" font-poppins font-bold text-4xl leading-loose">
          Contact us
        </div>

        <div className="flex px[80px]">
          <img
            src={bannerImage}
            alt=""
            className="bg-black w-[960px] h-[360px] rounded-xl"
          />
        </div>

        <div className="flex flex-col px[80px] gap-6">
          <div className="font-poppins font-bold text-2xl leading-12">
            Get in touch
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <div>Name</div>
              <input
                type="text"
                className="w-[480px] h-[40px] rounded-[8px] border border-solid border-[#A2A2A2] p-[8px 12px] gap-4"
                placeholder="Name"
                style={{ paddingLeft: "8px", paddingRight: "8px" } as any}
              />
            </div>
            <div className="flex flex-col">
              <div>Email</div>
              <input
                type="text"
                className="w-[480px] h-[40px] rounded-[8px] border border-solid border-[#A2A2A2] p-[8px 12px] gap-4"
                placeholder="Email"
                style={{ paddingLeft: "8px", paddingRight: "8px" } as any}
              />
            </div>
            <div className="flex flex-col">
              <div>Message</div>
              <textarea
                className="w-[480px] h-[204px] rounded-[8px] border border-solid border-[#A2A2A2] p-[8px 12px] gap-4"
                placeholder="Enter your text"
                style={
                  { paddingLeft: "8px", paddingRight: "8px" } as any
                }></textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-96"></div>
    </>
  );
};

export default ContactUs;
