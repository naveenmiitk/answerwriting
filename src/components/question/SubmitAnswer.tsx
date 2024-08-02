import React from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { PDFUpload } from '../v0/pdfupload';
import UploadButtonBlue from '../uploadButton/uploadButton';
import UploadPDF from '../uploadButton/uploadpdf';

interface SubmitAnswerProps {
  questionId: number;
}

const SubmitAnswer: React.FC<SubmitAnswerProps> = ({ questionId }) => {
  return (
    <div className="space-y-4">
      <h1>Your Answer</h1>
      {/* <UploadButtonBlue /> */}
      <UploadPDF/>
      <Textarea rows={12} className="focus-visible:ring-0" />
      <Button className="bg-blue-500 hover:bg-blue-500/90">
        Post Your Answer
      </Button>
      <h1 className="text-sm text-neutral-500">
        By clicking “Post Your Answer”, you agree to our terms of service and
        acknowledge you have read our privacy policy.
      </h1>
    </div>
  );
};

export default SubmitAnswer
