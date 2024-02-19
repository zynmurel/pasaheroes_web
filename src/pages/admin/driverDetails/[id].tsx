import { useRouter } from "next/router";
import { api } from "~/utils/api";
import ToPrint from "./components/ToPrint";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import DriverDetails from "./components/DriverDetails";
import { DatePickerProps } from "antd";
import dayjs from "dayjs";
import RidesHistory from "./components/RidesHistory";
import RideModal from "./components/RideModal";
import PasaherosComments from "./components/PasaherosComments";

const DriveDetails = () => {
  const router = useRouter();
  const componentRef = useRef(null);
  const [ridesDate, setRidesDate] = useState(dayjs().toDate());
  const [ridesModal, setRidesModal] = useState<any>(null);
  const [commentsDate, setCommentsDate] = useState(dayjs().toDate());

  const { data: driverData, isLoading: driverDetailsIsLoading } =
    api.driver.getDriver.useQuery(
      {
        id: router.query.id as string,
      },
      {
        enabled: !!router.query.id,
      },
    );

  const { data: driverRides, isLoading: driverRidesIsLoading } =
    api.driver.getDriversRideHistory.useQuery(
      {
        id: router.query.id as string,
        startDate: dayjs(ridesDate).startOf("day").toDate(),
        endDate: dayjs(ridesDate).endOf("day").toDate(),
      },
      {
        enabled: !!router.query.id && !!ridesDate,
      },
    );

  const { data: comments, isLoading: commentsIsLoading } =
    api.driver.getCommentsToDriver.useQuery(
      {
        id: router.query.id as string,
        startDate: dayjs(commentsDate).startOf("day").toDate(),
        endDate: dayjs(commentsDate).endOf("day").toDate(),
      },
      {
        enabled: !!router.query.id && !!commentsDate,
      },
    );

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleEditDriverDetails = () => {
    router.push(`/admin/editDriver/${router.query.id}`);
  };

  const onChangeDateRides = (date: Date) => {
    setRidesDate(date);
  };
  const onChangeDateComments = (date: Date) => {
    setCommentsDate(date);
  };

  if (driverDetailsIsLoading || !router.query.id) {
    return (
      <div className=" flex h-full w-full items-center justify-center">
        Loading ...
      </div>
    );
  }

  return driverData ? (
    <div className=" flex h-full flex-col gap-2 p-5 pt-0">
      <ToPrint componentRef={componentRef} driverData={driverData} />
      <DriverDetails
        handlePrint={handlePrint}
        handleEditDriverDetails={handleEditDriverDetails}
        driverData={driverData}
      />
      <div className=" flex flex-1 flex-row  gap-2 rounded-xl">
        <div className=" flex-1 rounded-xl bg-white shadow">
          <RidesHistory
            ridesDate={ridesDate}
            onChangeDateRides={onChangeDateRides}
            driverRides={driverRides}
            driverRidesIsLoading={driverRidesIsLoading}
            setRidesModal={setRidesModal}
          />
          <RideModal ridesModal={ridesModal} setRidesModal={setRidesModal} />
        </div>
        <div className=" flex-1 rounded-xl bg-white shadow">
          <PasaherosComments
            commentsDate={commentsDate}
            onChangeDateComments={onChangeDateComments}
            comments={comments}
            commentsIsLoading={commentsIsLoading}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className=" flex h-full w-full items-center justify-center">
      No User Found
    </div>
  );
};

export default DriveDetails;