import useGetScans from "../../api/scansApi";
import ScanCard from "../../components/ScanCard/ScanCard";
import "./home.scss";

const Home = () => {
  const { data: allScans, isLoading } = useGetScans();

  console.log("allScans", allScans, isLoading);
  return (
    <div className="home">
      {allScans?.map((scanDetail) => {
        return <ScanCard scanDetail={scanDetail} key={scanDetail.id} />;
      })}
    </div>
  );
};

export default Home;
