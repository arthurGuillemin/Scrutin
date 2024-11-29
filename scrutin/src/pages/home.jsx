import React from "react";
import "./home.css";
import graphHomeImage from '../../assets/images/graphHome.jpg';

function HomePage() {
    return (
        <div>
            <article>
            <img src={graphHomeImage} alt="Graph Home" />

                <h1>La Phrase dAccrocheOULALA JKEIUH APJEGPIHPOA zjhefibdkjahzebfklajZHB</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </article>
            <article>
                <section>
                    <div>
                    <h2>Posez votre question</h2>
                        <p>Définissez clairement l'objet de votre scrutin, avec la possibilité de l'accompagner d'une description détaillée.</p>
                    </div>
                    <div>
                        <h2>Configurez vos réponses</h2>
                        <p>Offrez plusieurs options de réponse aux votants. Vous décidez du nombre et du format des choix.</p>
                    </div>
                    <div>
                        <h2>Définissez la durée du scrutin </h2>
                        <p>Assurez-vous d’une période claire et précise pour permettre à tous de voter à temps.</p>
                    </div>
                    <div>
                        <h2>Obtenez des résultats clairs</h2>
                        <p>Une fois le vote clôturé, découvrez quelle option a été préférée, mise en avant automatiquement.</p>
                    </div>
                </section>
                <section>

                </section>
                
            </article>
            <article>
                <section>
                    <h1>10 derniers scrutins créés</h1>

                </section>
                <section>
                    <h1>10 le plus actifs</h1>

                </section>
            </article>
        </div>
    )
    
  }

export default HomePage;