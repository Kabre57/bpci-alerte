import React from 'react';

const AboutService = () => {
    return (
        <div className="shadow-md rounded-sm bg-[#001051] w-full max-w-[400px] max-[1024px]:order-0 h-fit lg:sticky lg:top-[150px] lg:mb-10">
            <div className="text-[1.1rem] bg-[var(--color-bpcirouge)] 
                    px-6 py-[1rem] w-full text-center flex-wrap text-left justify-center align-center font-PoppinsSemiBold text-white">
                A propos de ce service{" "}
            </div>
            <div className="px-6 py-[1rem]">
                <p className="text-white text-[.9rem] leading-[2.1rem]">
                    Il vous suffit ici de renseigner les informations demandées à travers les champs proposés pour
                    faire votre dépôt de plainte et nous nous chargeons du reste
                    (gérer votre plainte, vous donner la possibilité de suivre le traitement de votre plainte).
                    Ici vos données collectées ne sont pas utilisées à des fins. Vous pouvez toutefois suivre le processus en restant anonyme si vous le souhaitez. Nous tenons
                    une transparence dans notre traitement et les données sont automatiquement supprimées après traitement.
                </p>
            </div>
        </div>
    );
}

export default AboutService;