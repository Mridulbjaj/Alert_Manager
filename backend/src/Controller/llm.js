const serverconfig = require("../config/servercofig")
const AlertData = require('../Modal/Alert.js')
const { geminiClient } = require('../Modal/GeminiModal.js');

function extractVerdictAndReport(responseText) {
   const verdictPattern = /"Agent_Verdict":\s*"([^"]+)"/;
   const reportPattern = /"Report":\s*"([\s\S]+?)"/;

   const verdictMatch = responseText.match(verdictPattern);
   const reportMatch = responseText.match(reportPattern);

   const verdict = verdictMatch ? verdictMatch[1] : null;
   const report = reportMatch ? reportMatch[1] : null;
   return { verdict, report };
}

exports.analyze_with_gemini = async (alert) => {
   const prompt = `Analyze this security alert and determine if it's a true positive or false positive and it should be exactly true positive or false postive not likely or potentially.

Alert data:
- Threat Name: ${alert.threatName}
- File Path: ${alert.filePath}
- File Verification Type: ${alert.fileVerificationType}
- Originator Process: ${alert.originatorProcess}
- Confidence Level: ${alert.confidenceLevel}
- Process User: ${alert.processUser}
- Computer Name: ${alert.computerName}
- Logged In User: ${alert.loggedInUser}

Output a JSON with these fields:
{
  "Agent_Verdict: "",
  "Report : ""
}
`;

   try {
      const model = geminiClient.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const responseText = await response.text(); // Fixed: `await` needed for `text()`
      const { verdict, report } = extractVerdictAndReport(responseText);
      const alertObj = new AlertData(alert._id);
      const Agent_Verdict = verdict;
      const Report = report;
      const updatedAlert = await alertObj.updateAlert(Agent_Verdict, Report);
        return {
            status: true,
            message: 'Response generated successfully',
            data: updatedAlert
         }
    } catch (error) {
      console.error('Error generating response:', error);
      return {
         status: false,
         message: 'Error generating response',

      }
   }

}


exports.generate_fallback_analysis = async (alertData) => {
   console.log('Fallback analysis triggered for alert:', alertData._id);
   const threatName = alertData.threatName || 'Unknown Threat';
   const filePath = alertData.filePath || 'Unknown Path';
   const fileVerification = alertData.fileVerificationType || 'Unknown';
   const originatorProcess = alertData.originatorProcess || 'Unknown Process';
   const confidenceLevel = alertData.confidenceLevel || 'Unknown';
   const computerName = alertData.agentComputerName || 'Unknown Computer';
   const loggedUser = alertData.agentLastLoggedInUserName || 'Unknown User';

   let isTruePositive = true;
   if (fileVerification === 'Signed' && confidenceLevel.toLowerCase() === 'low') {
      isTruePositive = false;
   }

   // Building the report
   let report = `The alert indicates a ${threatName} detection on endpoint ${computerName} associated with user ${loggedUser}. `;
   report += `The file, located at "${filePath}", `;

   if (fileVerification === 'NotSigned') {
      report += 'is not digitally signed, which raises concerns regarding its legitimacy. ';
   } else {
      report += `has a verification type of ${fileVerification}. `;
   }

   report += `The originating process for this activity was "${originatorProcess}", `;

   if (originatorProcess.toLowerCase().includes('explorer.exe')) {
      report += 'suggesting a potential user-initiated download or execution. ';
   } else if (originatorProcess.toLowerCase().includes('regsvr32')) {
      report += 'which is commonly used by malware to register DLLs. ';
   } else {
      report += 'which initiated the suspicious activity. ';
   }

   report += `The threat was detected with a ${confidenceLevel} confidence level. `;

   if (isTruePositive) {
      report += 'Based on the available evidence, this appears to be a true positive that requires attention.';
   } else {
      report += 'Based on the available evidence, this might be a false positive, but further investigation is recommended.';
   }

   try {
      const alert = new AlertData(alertData._id);
      const Agent_Verdict = isTruePositive ? 'true positive' : 'false positive';
      const Report = report;
      const updateAlert = await alert.updateAlert(Agent_Verdict, Report);
      if (!updateAlert) {
         throw new Error('Failed to update alert in the database');
      }
      console.log('Alert updated successfully:', alertData._id);
      return {
         status: true,
         message: 'Response generated successfully',
         data: updateAlert
      };
   } catch (error) {
      console.error('Error updating alert:', error);
      return {
         status: false,
         message: 'Error updating alert',
      }
   }



}

