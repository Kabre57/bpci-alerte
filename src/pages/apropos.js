import React from 'react'
import Accordion from '../components/Accordion'
import Footer from '../components/footer'; 
import { motion } from "framer-motion"

const containerVariants = {


  hidden: {
    opacity: 0,
    x: "2.5vh",
  },
  visible: {
    opacity: 1,
    x: "0",
    // transition: { duration: .5 }
  },
  exit: {
    x: "-2.5vh",
    opacity: 0,
    transition: { ease: 'easeInOut' },
  }
};


export default function Apropos() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit" className='w-full bg-white h-fit'>

      <div className='min-h-[100vh] flex flex-wrap bg-white fixed-w p-10'>
        <div className='w-full'>
          <h3 className='text-[3.5rem] font-PoppinsSemiBold'>A propos</h3>
          <div className='mt-[1.5rem] flex flex-col gap-[1.1rem]'>
            <Accordion
              // key={`${idx}`}
              title={"Contexte et justification"}
              description={`La Banque Populaire a affiché une «tolérance zéro» à combattre toute pratique pouvant nuire à son bon fonctionnement et considérée comme un obstacle substantiel au développement. A l’appui de sa détermination, plusieurs réformes normatives et institutionnelles ont été initiées. Ces réformes et actions ont servi de levier aux autorités administratives et judiciaires pour traiter et sanctionner effectivement plusieurs faits avérés ayant une caractère nuisible. Ce dispositif, à travers les données qu’il contribuera à collecter, permettra au à l’institution de prendre efficacement en charge son rôle dans la prévention, la détection, la poursuite voire la répression des faits; notamment en termes de sanctions administratives ou disciplinaires.`} />

            <Accordion
              // key={`${idx}`}
              title={"Mission"}
              description={`La Cellule d’analyse et de traitement des Plaintes et Dénonciations  a pour mission de contribuer au renforcement des actions visant la lutte contre l’impunité et la mauvaise gouvernance dans l'institution.
              A ce titre, elle est notamment chargée de: rendre opérationnel un cadre de facilitation des plaintes et dénonciations de tout acte en rapport avec mauvaise gouvernance au sein de la structure; analyser les plaintes et dénonciations ainsi que les éléments de preuve fournis par les plaignants ou dénonciateurs; inciter les citoyens à surveiller la reddition des comptes par les dirigeants; proposer les suites à donner à chaque dossier; rendre publiques , dans les cas de faits avérés, les suites données aux plaintes et dénonciations, conformément aux orientations du Comité de supervision.
              Dans le cadre de sa mission, la Cellule La Cellule d’analyse et de traitement des Plaintes et Dénonciations peut ponctuellement recourir à toute expertise extérieure qui s’avérerait nécessaire. Elle peut notamment solliciter l’appui ou l’implication des services spécialisés de l’État dans la conduite de ses missions d’investigation`} />

            <Accordion
              // key={`${idx}`}
              title={"Organisation de la cellule"}
              description={``} />

          </div>
        </div>
      </div>
      <Footer /> 
    </motion.div>
  )
}
