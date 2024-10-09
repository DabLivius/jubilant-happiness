import "../styles/style.css";

const Footer = () => {
  return (
    <>
      <footer class="footer has-background-black">
        <div class="container">
          <div class="column container-redes">
            <h4 class="title is-4 has-text-white has-text-centered">
              Redes Sociales
            </h4>
            <div className="columns is-mobile is-centered">
              <div className="column is-1 has-text-centered">
                <i class="fa-brands fa-facebook"></i>
              </div>
              <div className="column is-1 has-text-centered">
                <i class="fa-brands fa-instagram"></i>
              </div>
              <div className="column is-1 has-text-centered">
                <i class="fa-brands fa-twitter"></i>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="bd-notification column">
              <h4 class="title is-4 has-text-white has-text-left">
                Contactanos
              </h4>
              <div class="has-text-white">
                <p>Dirección: Calle 20 #11-20. Centro, Neiva – Colombia</p>
                <p>Comunícate: +57 (317) 8517589. contactenos@dominio.com</p>
              </div>
            </div>
            <div class="bd-notification column">
              <h4 class="title is-4 has-text-white has-text-right">
                Horarios de Atención
              </h4>
              <div class="has-text-white has-text-right">
                <p className="">Lunes a Viernes: 7:00AM – 3:00PM</p>
                <p className="">Sabado : 7:00AM – 1:00PM</p>
                <p className="">Domingos y Festivos: Cerrado</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
