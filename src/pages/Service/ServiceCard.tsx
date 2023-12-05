import { IService } from "@/pages/Service/Service";
import { MdDone } from "react-icons/md";

interface ServiceProps {
  service: IService;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceProps) => {
  return (
    <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-4 text-4xl text-gray-600">
        {service.icon ? service.icon : <MdDone />}
      </div>
      <div className="text-center">
        <h2 className="mb-2 text-xl font-bold">{service.title}</h2>
        <p className="text-gray-500">{service.description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
