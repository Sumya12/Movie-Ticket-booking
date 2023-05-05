import React, { useState } from "react";
import faq from "../api/faq";
export default function Faq() {
  const [faqData, setfaqData] = useState(faq);
  return (
    <section id="faq" className="faq section-bg colorr">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>F.A.Q</h2>
          <h3>
            Frequently Asked <span>Questions</span>
          </h3>
          <p>These are some Frequently Asked Questions for this website</p>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <ul className="faq-list">
              {faqData.map((curElem) => {
                const { id, icon1, icon2, href, qns, ans } = curElem;
                return (
                  <>
                    <li key={id}>
                      <div
                        data-bs-toggle="collapse"
                        className="collapsed question"
                        href={href}
                      >
                        {qns}
                        <i className={icon1}></i>
                        <i className={icon2}></i>
                      </div>
                      <div
                        id={id}
                        className="collapse size"
                        data-bs-parent=".faq-list"
                      >
                        <p>{ans}</p>
                      </div>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
