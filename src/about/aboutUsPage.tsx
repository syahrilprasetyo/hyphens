import Footer from "../home/foother";
import Nav from "../home/nav";
import banner from "../img/Main_Banner2.jpg"
import missionImage1 from "../img/Rectangle_8.png";
import missionImage2 from "../img/Rectangle_8_1.png";
import missionImage3 from "../img/Rectangle_8_2.png";
import missionImage4 from "../img/Rectangle_8_3.png";
import teamImage1 from "../img/team1.png";
import teamImage2 from "../img/team2.png";
import teamImage3 from "../img/team3.png";
import teamImage4 from "../img/team4.png";
import teamImage5 from "../img/team5.png";
import teamImage6 from "../img/team6.png";

export default function AboutUs() {
  return (
    <>
      <Nav />
      <div className="h-36"></div>
      <div className="flex flex-col px-[120px] justify-center content-center gap-10">
        <div className=" font-poppins font-bold text-4xl leading-loose">
          About
        </div>

        <div className="flex px[80px]">
          <img
            src={banner}
            alt=""
            className="bg-black w-[960px] h-[360px] rounded-xl"
          />
        </div>
        <div className="flex flex-col px[80px] gap-6">
          <div className="font-poppins font-bold text-2xl leading-12">
            Story
          </div>
          <div className="font-poppins text-base font-normal leading-6">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum
            asperiores mollitia ipsa natus sapiente dolores aliquid saepe ullam,
            quam eveniet libero amet explicabo pariatur. Quisquam quaerat
            temporibus quam earum ea. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Itaque illo aperiam velit sint rem eligendi sed ad
            laborum exercitationem iusto excepturi, consequuntur, quas ducimus
            veniam facere magni autem tempore dolor? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Nisi nesciunt id, a magnam, nulla
            reiciendis accusantium minima nam vitae iure dicta perspiciatis
            voluptatum ullam, excepturi voluptate quos quo voluptatem
            aspernatur!
          </div>
        </div>
        <div className="flex flex-col px[80px] gap-6">
          <div className="font-poppins font-bold text-2xl leading-12">
            Mission
          </div>
          <div className="flex flex-row w-full h-[372px] gap-[48px]">
            <div className="flex flex-col  w-[204px] h-[372px] gap-6 items-center">
              <img
                src={missionImage1}
                alt=""
                className=" w-[120px] h-[120px]"
              />
              <div className="text-center">
                Quisque cursus sed felis at ullamcorper.
              </div>
              <p className="text-center font-poppins text-base font-normal leading-6">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
                ex iste esse nulla soluta asperiores fuga sit praesentium nam
                voluptates architecto quas impedit,
              </p>
            </div>
            <div className="flex flex-col  w-[204px] h-[372px] gap-6 items-center">
              <img
                src={missionImage2}
                alt=""
                className="  w-[120px] h-[120px]"
              />
              <div className="text-center">
                Quisque cursus sed felis at ullamcorper.
              </div>
              <p className="text-center font-poppins text-base font-normal leading-6">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
                ex iste esse nulla soluta asperiores fuga sit praesentium nam
                voluptates architecto quas impedit,
              </p>
            </div>
            <div className="flex flex-col  w-[204px] h-[372px] gap-6 items-center">
              <img
                src={missionImage3}
                alt=""
                className="  w-[120px] h-[120px]"
              />
              <div className="text-center">
                Quisque cursus sed felis at ullamcorper.
              </div>
              <p className="text-center font-poppins text-base font-normal leading-6">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
                ex iste esse nulla soluta asperiores fuga sit praesentium nam
                voluptates architecto quas impedit,
              </p>
            </div>
            <div className="flex flex-col  w-[204px] h-[372px] gap-6 items-center">
              <img src={missionImage4} alt="" className="w-[120px] h-[120px]" />
              <div className="text-center">
                Quisque cursus sed felis at ullamcorper.
              </div>
              <p className="text-center font-poppins text-base font-normal leading-6">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
                ex iste esse nulla soluta asperiores fuga sit praesentium nam
                voluptates architecto quas impedit,
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col px[80px] gap-6">
          <div className="font-poppins font-bold text-2xl leading-12">Team</div>
          <div className="grid grid-cols-3 gap-12">
            <div className=" w-[288px] h-[360px] rounded-[12px] bg-[#FFFFFF] shadow-md shadow-[#c5c5c5] flex flex-col items-center gap-3 p-6">
              <img
                src={teamImage1}
                alt=""
                className=" bg-black w-[105px] h-[160px] rounded-[80px] "
              />
              <div className="flex flex-col gap-3">
                <div className="flex flex-col w-[240px] h-[56px] gap-2">
                  <div className="text-center">Richard White</div>
                  <div className="text-center">Co-Founder</div>
                </div>
                <div className="font-poppins font-normal text-xs leading-[18px] text-center">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Excepturi cupiditate aliquid beatae reiciendis saepe
                  reprehenderit ex mollitia doloribus quas, vel voluptatum
                  consequuntur enim aperiam ducimus odio. Aspernatur ex ea
                  ipsam.
                </div>
              </div>
            </div>

            <div className=" w-[288px] h-[360px] rounded-[12px] bg-[#FFFFFF] shadow-md shadow-[#c5c5c5] flex flex-col items-center gap-3 p-6">
              <img
                src={teamImage2}
                alt=""
                className=" bg-black w-[105px] h-[160px] rounded-[80px] "
              />
              <div className="flex flex-col gap-3">
                <div className="flex flex-col w-[240px] h-[56px] gap-2">
                  <div className="text-center">Henry Simon</div>
                  <div className="text-center">Co-Founder</div>
                </div>
                <div className="font-poppins font-normal text-xs leading-[18px] text-center">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Excepturi cupiditate aliquid beatae reiciendis saepe
                  reprehenderit ex mollitia doloribus quas, vel voluptatum
                  consequuntur enim aperiam ducimus odio. Aspernatur ex ea
                  ipsam.
                </div>
              </div>
            </div>

            <div className=" w-[288px] h-[360px] rounded-[12px] bg-[#FFFFFF] shadow-md shadow-[#c5c5c5] flex flex-col items-center gap-3 p-6">
              <img
                src={teamImage3}
                alt=""
                className=" bg-black w-[105px] h-[160px] rounded-[80px] "
              />
              <div className="flex flex-col gap-3">
                <div className="flex flex-col w-[240px] h-[56px] gap-2">
                  <div className="text-center">Arnold Ramos</div>
                  <div className="text-center">Co-Founder</div>
                </div>
                <div className="font-poppins font-normal text-xs leading-[18px] text-center">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Excepturi cupiditate aliquid beatae reiciendis saepe
                  reprehenderit ex mollitia doloribus quas, vel voluptatum
                  consequuntur enim aperiam ducimus odio. Aspernatur ex ea
                  ipsam.
                </div>
              </div>
            </div>

            <div className=" w-[288px] h-[360px] rounded-[12px] bg-[#FFFFFF] shadow-md shadow-[#c5c5c5] flex flex-col items-center gap-3 p-6">
              <img
                src={teamImage4}
                alt=""
                className=" bg-black w-[105px] h-[160px] rounded-[80px] "
              />
              <div className="flex flex-col gap-3">
                <div className="flex flex-col w-[240px] h-[56px] gap-2">
                  <div className="text-center">Jessica Yeoh</div>
                  <div className="text-center">Chief of Operation</div>
                </div>
                <div className="font-poppins font-normal text-xs leading-[18px] text-center">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Excepturi cupiditate aliquid beatae reiciendis saepe
                  reprehenderit ex mollitia doloribus quas, vel voluptatum
                  consequuntur enim aperiam ducimus odio. Aspernatur ex ea
                  ipsam.
                </div>
              </div>
            </div>

            <div className=" w-[288px] h-[360px] rounded-[12px] bg-[#FFFFFF] shadow-md shadow-[#c5c5c5] flex flex-col items-center gap-3 p-6">
              <img
                src={teamImage5}
                alt=""
                className=" bg-black w-[105px] h-[160px] rounded-[80px] "
              />
              <div className="flex flex-col gap-3">
                <div className="flex flex-col w-[240px] h-[56px] gap-2">
                  <div className="text-center">Arvin Cavil</div>
                  <div className="text-center">Chief of Execution</div>
                </div>
                <div className="font-poppins font-normal text-xs leading-[18px] text-center">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Excepturi cupiditate aliquid beatae reiciendis saepe
                  reprehenderit ex mollitia doloribus quas, vel voluptatum
                  consequuntur enim aperiam ducimus odio. Aspernatur ex ea
                  ipsam.
                </div>
              </div>
            </div>

            <div className=" w-[288px] h-[360px] rounded-[12px] bg-[#FFFFFF] shadow-md shadow-[#c5c5c5] flex flex-col items-center gap-3 p-6">
              <img
                src={teamImage6}
                alt=""
                className=" bg-black w-[105px] h-[160px] rounded-[80px] "
              />
              <div className="flex flex-col gap-3">
                <div className="flex flex-col w-[240px] h-[56px] gap-2">
                  <div className="text-center">Billy Ray Roman</div>
                  <div className="text-center">Chief of Marketing</div>
                </div>
                <div className="font-poppins font-normal text-xs leading-[18px] text-center">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Excepturi cupiditate aliquid beatae reiciendis saepe
                  reprehenderit ex mollitia doloribus quas, vel voluptatum
                  consequuntur enim aperiam ducimus odio. Aspernatur ex ea
                  ipsam.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-96"></div>
      <Footer />
    </>
  );
}
