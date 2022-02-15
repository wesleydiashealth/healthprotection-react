import React, { useState, useCallback, useRef } from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import ReactHtmlParser from 'react-html-parser';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Popup from 'reactjs-popup';

import { useApp } from 'contexts/app';
import Input from 'components/Input';

import getValidationErrors from 'utils/getValidationErrors';

import Container, {
  Title,
  Form,
  PopupTrigger,
  PopupContent,
  ConsentTitle,
  ConsentText,
  AdvertisementsIntro,
  AdvertisementsFieldset,
  AdvertisementsText,
} from './styles';

const Report: React.FC = () => {
  const context = useApp();
  const { labels } = context;

  const formRef = useRef<FormHandles>(null);

  const [userConsent, setUserConsent] = useState<boolean>(false);
  const [newsletterConsent, setNewsletterConsent] = useState<boolean>(true);

  const handleSubmit = useCallback(async (data: HTMLFormElement) => {
    // eslint-disable-next-line no-console
    console.log(data);

    try {
      formRef.current?.setErrors({});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  return (
    <Container>
      <Title>
        {labels.newsletter_title ||
          'Get your personalized and detailed report by email:'}
      </Title>
      <Form id="report_form" ref={formRef} onSubmit={handleSubmit}>
        <Input type="text" name="email" placeholder="E-mail*" />
        <label htmlFor="user_consent" aria-required>
          <Input
            type="checkbox"
            name="user_consent"
            onClick={() => {
              setUserConsent(!userConsent);
            }}
          />
          <Popup
            trigger={
              <PopupTrigger>
                {labels.newsletter_agree || 'I accept the legal conditions'}
              </PopupTrigger>
            }
            modal
            nested
          >
            <PopupContent>
              <Scrollbar style={{ height: 'calc(100vh - 80px)' }}>
                <ConsentTitle>
                  {labels.newsletter_consent_title ||
                    'CONSENT FOR PROCESSING PERSONAL DATA'}
                </ConsentTitle>
                <ConsentText>
                  {labels.newsletter_consent_text ? (
                    ReactHtmlParser(labels.newsletter_consent_text)
                  ) : (
                    <>
                      <strong>HEALTH PROTECTION EUROPE S.L.</strong> is the
                      Controller of the user’s personal data and informs him/her
                      that these data shall be processed in accordance with the
                      provisions of Regulation (EU) 2016/679 of 27 April (GDPR)
                      and the Organic Law 3/2018 of 5 December (LOPDGDD),
                      providing the following information on the processing:
                      <strong>Purposes and legitimacy of the processing</strong>
                      : maintaining a commercial relationship (in the legitimate
                      interest of the Controller, art. 6.1.f GDPR) and sending
                      communications concerning products or services (with the
                      consent of the Data Subject, art. 6.1.a GDPR).
                      <strong>Data storage criteria</strong>: data shall be
                      stored for no longer than is necessary to maintain the
                      purpose of the processing or for as long as there are
                      legal prescriptions dictating their custody, and when such
                      purpose is no longer necessary the data shall be erased
                      with appropriate security measures to ensure the
                      anonymization of the data or their complete destruction.
                      <strong>Communication of data</strong>: data will not be
                      disclosed to third parties, unless legally obliged to do
                      so.
                      <strong>Rights of the User</strong>:
                      <ul>
                        <li>Right to withdraw consent at any time.</li>
                        <li>
                          Right of access, rectification, portability and
                          erasure of data and the limitation or objection to
                          their processing.
                        </li>
                      </ul>
                      The right to file a claim with the Spanish Supervisory
                      Authority (www.aepd.es) if you consider that the
                      processing does not comply with the current legislation.
                      <strong>Contact information for exercising rights</strong>
                      : HEALTH PROTECTION EUROPE S.L.. AVD CAN BELLET 43 (4 C),
                      - 08174 SANT CUGAT DEL VALLÈS (Barcelona). E-mail:{' '}
                      <a href="mailto:vidal@healthprotection.com">
                        vidal@healthprotection.com
                      </a>
                      Contact details of the data protection officer: Pque
                      Científico y Tecnológico de Cantabria PCTCAN Edificio 3000
                      C/ Isabel Torres, 11 Of. 16, 39011 SANTANDER -{' '}
                      <a href="mailto:gustavo@fsconsultores.es">
                        gustavo@fsconsultores.es
                      </a>
                    </>
                  )}
                </ConsentText>
                <AdvertisementsIntro>
                  {labels.newsletter_consent_advertisements ? (
                    ReactHtmlParser(labels.newsletter_consent_advertisements)
                  ) : (
                    <>
                      <strong>ADVERTISEMENTS</strong>: In compliance with the
                      provisions of Article 21 of Spanish Act 34/2002 on
                      Information Society Services and Electronic Commerce
                      (LSSI), we ask for your consent to subscribe and to
                      receive our newsletter.
                    </>
                  )}
                </AdvertisementsIntro>
                <AdvertisementsFieldset id="newsletter_policy">
                  <label htmlFor="newsletter_policy_accept">
                    <Input
                      type="radio"
                      name="newsletter_policy"
                      value="true"
                      checked={!!newsletterConsent}
                      onChange={() => {
                        setNewsletterConsent(true);
                      }}
                    />
                    {labels.newsletter_consent_advertisements_accept ||
                      'I accept'}
                  </label>
                  <label htmlFor="newsletter_policy_dont_accept">
                    <Input
                      type="radio"
                      name="newsletter_policy"
                      value="false"
                      checked={!newsletterConsent}
                      onChange={() => {
                        setNewsletterConsent(false);
                      }}
                    />
                    {labels.newsletter_consent_advertisements_dont_accept ||
                      'I don´t accept'}
                  </label>
                </AdvertisementsFieldset>
                <AdvertisementsText>
                  {labels.newsletter_consent_advertisements_text ? (
                    ReactHtmlParser(
                      labels.newsletter_consent_advertisements_text,
                    )
                  ) : (
                    <>
                      <strong>Purpose and legitimacy of the processing</strong>:
                      sending communications concerning products or services
                      through the Newsletter to which you have subscribed (with
                      the Data Subject’s consent, art. 6.1.a GDPR).
                      <strong>Data storage criteria</strong>: data shall be
                      stored for no longer than is necessary to maintain the
                      purpose of the processing or for as long as there are
                      legal prescriptions dictating their custody, and when such
                      purpose is no longer necessary the data shall be erased
                      with appropriate security measures to ensure the
                      anonymization of the data or their complete destruction.
                      <strong>Communication of data</strong>: data will not be
                      disclosed to third parties, unless legally obliged to do
                      so.
                      <strong>Rights of the Data Subject</strong>:
                      <ul>
                        <li>Right to withdraw consent at any time.</li>
                        <li>
                          Right of access, rectification, portability and
                          erasure of the data, and those of limitation or
                          opposition to their processing.
                        </li>
                        <li>
                          Right to submit a complaint to the Supervisory
                          Authority (www.aepd.es) if they consider that the
                          processing does not comply with current legislation.
                        </li>
                      </ul>
                    </>
                  )}
                </AdvertisementsText>
              </Scrollbar>
            </PopupContent>
          </Popup>
        </label>
        <input
          type="submit"
          value={labels?.newsletter_button || 'Send'}
          disabled={!userConsent}
        />
        {/* <PDFDownloadLink
          document={
            <ReportDocument
              {...{
                answers,
                outcomes,
                suboutcomes,
                selectedConnections,
                excludes,
                habits,
                sankeyImg,
              }}
            />
          }
        >
          Download
        </PDFDownloadLink> */}
      </Form>
    </Container>
  );
};

export default Report;
