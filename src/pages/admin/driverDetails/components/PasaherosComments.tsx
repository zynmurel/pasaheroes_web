import { Rate } from "antd";
import dayjs from "dayjs";
import { FaStar } from "react-icons/fa";
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime);

const PasaherosComments = ({
  setTakeComments,
  takeComments,
  comments,
  count,
  commentsIsLoading,
}: any) => {
  console.log(comments);
  return (
    <div className=" flex h-full flex-1 flex-col gap-2 rounded-xl bg-white p-3 shadow">
      <div className=" flex flex-row items-center justify-between gap-2 px-2">
        <div className=" flex-1 text-base font-medium text-gray-700">
          Passenger's Comments
        </div>
      </div>
      {comments?.length ? (
        <div className=" ">
          <div className=" flex max-h-96 min-h-full flex-col gap-2 overflow-scroll rounded-lg border border-solid border-gray-100 p-1">
            {[...comments].map((comment: any, index) => {
              return (
                <div className=" rounded-md bg-gray-100 p-0 py-2  shadow" key={index}>
                  <div className=" flex flex-row items-center justify-between p-0 px-5 pb-0">
                    <div className=" text-lg font-medium text-gray-700">
                      {comment.Pasahero.firstName} {comment.Pasahero.lastName}
                    </div>
                    {comment.Ride?.Rating ? (
                      <div className=" left-14 flex items-center justify-center gap-1">
                        <Rate
                          allowHalf
                          character={<FaStar size={15} />}
                          disabled
                          value={parseFloat(
                            comment.Ride?.Rating.rating.toFixed(1),
                          )}
                        />
                        {/* <span className="">
                          ({parseFloat(comment.Ride?.Rating.rating.toFixed(1))})
                        </span> */}
                      </div>
                    ) : (
                      <span className=" text-xs text-gray-400">
                        {" No Rating"}
                      </span>
                    )}
                  </div>

                  <div className=" mx-3 rounded-md bg-white p-1 px-5 text-gray-700">
                    {comment.comment}
                    <div className=" flex w-full justify-end p-1 pb-0 text-xs text-gray-400">
                      {dayjs(comment.createdAt).format("MMM D, YYYY h:mm A")}
                    </div>
                  </div>
                </div>
              );
            })}
            {takeComments < count ? (
              <div className=" flex w-full items-center justify-center">
                <button
                  className=" cursor-pointer border-none bg-white py-1 text-gray-600"
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                  onClick={() => setTakeComments((prev: number) => prev + 4)}
                >
                  {commentsIsLoading ? "Loading..." : "Load More"}
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <div className=" flex h-full w-full items-center justify-center">
          No Passengers Comments
        </div>
      )}
    </div>
  );
};

export default PasaherosComments;
