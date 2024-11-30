import React from 'react'
import { media } from '../libs/media'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import jsPDF from 'jspdf';
import { RootUserContext } from '../contexts';
const RecapPDF = () => {

  const location = useLocation();
  const userContext = React.useContext(RootUserContext)
  const [datapage, setdatapage] = useState();
  const [pdfGenerated, setpdfGenerated] = useState(false);

  const GenPdfCallback = React.useCallback(() => {
    datapage?.data && !pdfGenerated && generatePDF()
  }, [datapage])

  React.useEffect(() => {
    setdatapage(location.state)
  }, [])


  useEffect(() => {
    GenPdfCallback()
  }, [GenPdfCallback]);

  function generatePDF() {

    // Récupérer l'élément HTML à exporter
    const elementHTML = document.getElementById('recapitulatif');

    // // Créer un canvas à partir de l'élément HTML
    // html2canvas(elementHTML).then((canvas) => {
    //   // Créer un objet jsPDF
    //   const pdfDoc = new jsPDF('l', 'mm', 'a4');

    //   // Ajouter le canvas sous forme d'image
    //   const imgData = canvas.toDataURL('image/png');
    //   pdfDoc.addImage(imgData, 'PNG', 0, 0, 297, 100);

    //   // Télécharger le fichier PDF
    //   pdfDoc.save(`Recap-${Date.now()}-${datapage.data['codeplainte']}.pdf`);
    // });

    const pdfDoc = new jsPDF('p', 'px', 'a3');

    // Convertir l'élément HTML en une chaîne de caractères


    // Ajouter le contenu HTML au document PDF
    //pdfDoc.fromHTML(htmlString, 15, 15);
    pdfDoc.html(elementHTML, {
      callback: function () {
        // Télécharger le fichier PDF
        pdfDoc.save(`Recap-${Date.now()}-${datapage.data['codeplainte']}.pdf`);
      },
      // margin: [10, 10],
      x: 0,
      y: 0,
      // Ajouter la classe CSS pour les styles
      classes: { 'page-a4': 'page-a4', 'header_page': 'header_page', 'title': 'title', 'content_page': 'content_page' },


    });
    setpdfGenerated(true)

    // Télécharger le fichier PDF
  }


  return (


    <div id="recapitulatif" className="page-a4">
      <style>
        {`
    /* Styles pour la mise en page */
    
    .page-a4 {
      width: 21cm;
      height: auto;
      margin:auto;
      padding : 5%;
        background-color: #fff;
        font-family: 'Poppins', sans-serif;
        color: #333;
      }

    .header_page .logo img {
      width: 20%;
    }

    .header_page .title {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 24px;
    }
    .header_page .title h1 {
      font-size: 25px;
      font-weight: bold;
      flex: 60%;
      margin: 0;
    }
    .header_page .qr_code {
      margin: auto;
      display: flex;
      justify-content: flex-start;
      flex: 20%;
    }
    .header_page .qr_code img {
      width: 30%;
    }

    .content_page h1 {
      font-size: 20px;
      font-weight: bold;
      margin-top: 32px;
    }

    .content_page .tablee table {
      margin-top: 32px;
      width: 80%;
    }
    .content_page .tablee table tr .label {
      font-weight: bold;
    }

    .subText {
      font-weight: bold;
    }

    address {
      font-size: 12px;
    }

    table {
      font-size: 12px;
      padding : 0;
    }

    .infos_plaintes {
      margin-top: 40px;
    }

    .infos_plaintes table tr td.label span {
      margin-right: 50px;
    }
    .infos_plaintes table td {
      /* border-bottom: 15px; */
      border-bottom: solid 1px !important;
    }
  `}
      </style>

      <div className="header_page">
        <div className="logo">
          <img
            src={media.Logos.logo}
            alt="logo"
          />
        </div>
        <div className="title">
          <h1>Banque populaire de Côte-d'Ivoire</h1>
          <div className="qr_code">
            {' '}
            <img
              src={datapage?.data['codeQrImagePlainte']}

              alt="qr"
            />
          </div>
        </div>
        <div className="adresse">
          <address>
            <div className="location">01BP 1452 Abidjan</div>
            <div className="telephone">+255xxxxxxx</div>
            <div className="email">exemple@gmail.com</div>
          </address>
        </div>
      </div>
      <div className="content_page">
        <h1>Récapitulatif remonté d'Alerte</h1>
        <div className="tablee infos_générales">
          <table>
            <tr>
              <td className="label">Nom :</td>
              <td>{datapage?.data['nom'] && datapage?.data['nom'].trim().length > 0 ? datapage?.data['nom'] : "Anonyme"} </td>
              <td className="label">N°Ref :</td>
              <td>{datapage?.data['id']}</td>
            </tr>
            <tr>
              <td className="label">Prénom :</td>
              <td>{datapage?.data['prenom'] && datapage?.data['prenom'].trim().length > 0 ? datapage?.data['prenom'] : "Anonyme"}</td>
              <td className="label">N° de suivi : </td>
              <td>{datapage?.data['codeplainte']}</td>
            </tr>

            <tr>
              <td className="label">Téléphone :</td>
              <td>{datapage?.data['phone']}</td>
              <td className="label">Date: </td>
              <td>
                <span className="date">{datapage?.data['datePlainte']}</span>
                <span className="hour"> à {datapage?.data['heurePlainte']}</span>
              </td>

            </tr>
          </table>
        </div>
        <div className="tablee infos_plaintes">
          <table>
            <tr>
              <td className="label">
                <span className="organ_impliq">Organisme concerné:</span>{" "}
              </td>
              <td>
                <span className="service">{datapage?.data['organisation']}</span>{" "}
              </td>

            </tr>
            <tr>
              <td className="label">
                <span className="pers_impliq">Personnes impliquées:</span>{" "}
              </td>
              <td>
                {
                  datapage?.data['personneimplique'].split(",").map(it => {
                    return (

                      <li className="perso">{it}</li>
                    )
                  })
                }
              </td>
            </tr>
            {/* <tr>
        <td className="label">
          <span className="preuv_apport">Preuves apportées:</span>{" "}
        </td>
        <td>
          <li className="preuv">preuve n°: 1</li>
          <li className="preuv">preuve n°: 1</li>
          <li className="preuv">preuve n°: 1</li>
        </td>
      </tr> */}
          </table>

          {
            userContext.user.email && <>

              <h3 className="text-[.9rem] subText font-PoppinsSemiBold mt-[2rem]">Traité par :</h3>
              <ul className='mt-2 '>
                <li className='text-[1rem]'>{userContext.user.email || "Non défini."}</li>
              </ul>

              <h3 className="text-[.9rem] subText font-PoppinsSemiBold mt-[2rem]">Status de la plainte :</h3>
              <ul className='mt-2 '>
                <li className='text-[1rem]'>{datapage?.data?.status || "Non défini."}</li>
              </ul>

              <h3 className="text-[.9rem] subText font-PoppinsSemiBold mt-[1.2rem]">Commentaire après traitement de la plainte :</h3>

              <ul className='mt-2 '>
                <li className='text-[1rem]'>{datapage?.data?.statusMessage || "Vide."}</li>
              </ul>
            </>
          }

        </div>
      </div>

    </div>

  )
}

export default RecapPDF