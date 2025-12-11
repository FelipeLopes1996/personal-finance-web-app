import InfoCard from "../../components/InfoCard";
import { infoCardHomeData } from "../../utils/InfoCardHomeData";

const Home = () => {
  return (
    <div className="py-6">
      <section className="py-4 md:py-12 text-center bg-cover bg-center relative">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-[1.7rem] md:text-[3rem] font-extrabold mb-6 text-black leading-tight mx-auto">
            Bem-vindo ao seu controle de finanças
          </h1>
          <p className="text-[1rem]  md:text-[1rem] md:w-[100%] w-[80%] mb-6 mx-auto">
            Organize suas finanças, acompanhe seus gastos, a tranquilidade
            financeira que você sempre sonhou. Simples, intuitivo e poderoso.
          </p>
        </div>
      </section>
      <section className="py-[1rem]">
        <div className="container mx-auto px-4 md:px-26">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-stretch">
            {infoCardHomeData.map(
              ({ icon, title, infoText, isInComing }, index) => (
                <InfoCard
                  key={index}
                  icon={icon}
                  title={title}
                  infoText={infoText}
                  isInComing={isInComing}
                />
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
