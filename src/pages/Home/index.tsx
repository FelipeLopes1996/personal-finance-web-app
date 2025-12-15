import InfoCard from "../../components/InfoCard";
import { infoCardHomeData } from "../../utils/InfoCardHomeData";

const Home = () => {
  return (
    <div>
      <section className="py-4 md:py-20 text-center bg-cover bg-center relative bg-teal-50">
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
      <section className="py-10 md:py-15 bg-white">
        <div className="container mx-auto px-4 md:px-26">
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-[0.8rem] md:text-[1.7rem] font-extrabold mb-6 text-black leading-tight mx-auto">
              Tudo que Você Precisa para Dominar suas Finanças
            </h2>
            <p className="text-[0.5rem]  md:text-[1rem] md:w-[100%] w-[80%] mb-6 mx-auto">
              oferece ferramentas poderosas em uma interface amigável para você
              ter o controle total do seu dinheiro.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-stretch md:py-[2rem]">
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
