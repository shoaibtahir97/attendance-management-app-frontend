export const useDownloadFormOptions = () => {
  const downloadApplicationForm = async (course) => {
    window.open(`documents/${course}`, '_blank');
    //    const pdfBytes = await createPdfForm();
    //    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    //    const link = document.createElement('a');
    //    link.href = URL.createObjectURL(blob);
    //    link.download = 'admission_form.pdf';
    //    document.body.appendChild(link);
    //    link.click();
    //    document.body.removeChild(link);
  };

  const downloadFormOptions = [
    {
      key: 'download-bsc-form',
      label: 'Download BSc Admission Form',
      onClick: () =>
        downloadApplicationForm(
          'Stratford College London  Course Application Form BSc .pdf'
        ),
    },
    {
      key: 'download-hnd-ncc-form',
      label: 'Download HND & NCC Admission Form',
      onClick: () =>
        downloadApplicationForm(
          'Stratford College London  Application Form NCC HND NCFE.pdf'
        ),
    },
  ];
  return downloadFormOptions;
};
