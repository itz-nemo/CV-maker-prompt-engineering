"use client"

import { useState } from "react"
import CVForm from "@/components/cv-form"
import CVPreview from "@/components/cv-preview"
import { Download, Mail, Copy, FileJson, FileText, Code, ChevronDown } from "lucide-react"

export default function Home() {
  const [cvData, setCvData] = useState({
    fullName: "John Doe",
    jobTitle: "Software Engineer",
    cityCountry: "San Francisco, USA",
    phoneNumber: "+1 (555) 123-4567",
    email: "john.doe@email.com",
    portfolioUrl: "johndoe.com",
    linkedinUrl: "linkedin.com/in/johndoe",
    githubUrl: "github.com/johndoe",
    otherSocialUrls: "",
    summaryText:
      "Experienced software engineer with a passion for building scalable applications. Proficient in full-stack development with expertise in modern web technologies. Seeking opportunities to contribute to innovative projects.",

    experience: [
      {
        id: 1,
        jobTitle: "Senior Software Engineer",
        companyName: "Tech Company Inc",
        employmentType: "Full-time",
        location: "San Francisco, USA",
        startDate: "Jan 2023",
        endDate: "Present",
        responsibilities: [
          "Led development of microservices architecture serving 1M+ users",
          "Mentored junior developers and conducted code reviews",
          "Optimized database queries reducing load time by 40%",
        ],
      },
      {
        id: 2,
        jobTitle: "Software Engineer",
        companyName: "StartUp Co",
        employmentType: "Full-time",
        location: "Remote",
        startDate: "Jun 2021",
        endDate: "Dec 2022",
        responsibilities: [
          "Developed full-stack features using React and Node.js",
          "Implemented CI/CD pipelines for automated deployments",
          "Collaborated with product team to deliver features on schedule",
        ],
      },
    ],

    education: [
      {
        id: 1,
        degree: "B.S. Computer Science",
        institutionName: "State University",
        startYear: "2017",
        endYear: "2021",
        grade: "3.8",
      },
    ],

    skills: ["JavaScript", "React", "Node.js", "Python", "SQL", "AWS", "Docker", "Git"],

    projects: [
      {
        id: 1,
        projectName: "E-commerce Platform",
        projectTags: "React, Node.js, MongoDB",
        projectDescription: "Built a full-stack e-commerce platform with payment integration",
        projectLink: "",
      },
    ],

    certifications: [],

    languages: [
      {
        id: 1,
        language: "English",
        level: "Fluent",
      },
    ],

    interests: ["Web Development", "Open Source", "Cloud Computing"],
  })

  const [showMenu, setShowMenu] = useState(false)

  const handleDownloadHTML = () => {
    const element = document.getElementById("cv-preview-content")
    if (!element) return

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${cvData.fullName} - CV</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 8.5in; height: 11in; margin: 0 auto; padding: 40px; background: white; }
    .header { border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 20px; }
    .name { font-size: 28px; font-weight: bold; color: #1e40af; }
    .title { font-size: 16px; color: #666; margin-top: 5px; }
    .contact { font-size: 12px; color: #666; margin-top: 10px; }
    .section { margin-bottom: 20px; }
    .section-title { font-size: 14px; font-weight: bold; color: #1e40af; border-bottom: 2px solid #2563eb; padding-bottom: 5px; margin-bottom: 10px; }
    .entry { margin-bottom: 12px; }
    .entry-title { font-weight: bold; color: #1e40af; }
    .entry-subtitle { font-size: 12px; color: #666; }
    .entry-description { font-size: 12px; margin-top: 5px; }
    ul { margin-left: 20px; font-size: 12px; }
    li { margin-bottom: 3px; }
    .skills { display: flex; flex-wrap: wrap; gap: 8px; font-size: 12px; }
    .skill-tag { background: #e0e7ff; color: #1e40af; padding: 4px 8px; border-radius: 4px; }
    @media print { body { margin: 0; padding: 0; } .container { margin: 0; padding: 20px; } }
  </style>
</head>
<body>
  <div class="container">
    ${element.innerHTML}
  </div>
</body>
</html>
    `

    const blob = new Blob([htmlContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${cvData.fullName.replace(/\s+/g, "_")}_CV.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setShowMenu(false)
  }

  const handleDownloadJSON = () => {
    const jsonData = JSON.stringify(cvData, null, 2)
    const blob = new Blob([jsonData], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${cvData.fullName.replace(/\s+/g, "_")}_CV.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setShowMenu(false)
  }

  const handleDownloadTXT = () => {
    let txtContent = `${cvData.fullName}\n`
    txtContent += `${cvData.jobTitle}\n`
    txtContent += `${cvData.cityCountry} | ${cvData.phoneNumber} | ${cvData.email}\n`
    txtContent += `Portfolio: ${cvData.portfolioUrl}\n`
    txtContent += `LinkedIn: ${cvData.linkedinUrl}\n`
    txtContent += `GitHub: ${cvData.githubUrl}\n\n`

    txtContent += `SUMMARY\n${"=".repeat(50)}\n${cvData.summaryText}\n\n`

    txtContent += `EXPERIENCE\n${"=".repeat(50)}\n`
    cvData.experience.forEach((exp) => {
      txtContent += `${exp.jobTitle} - ${exp.companyName}\n`
      txtContent += `${exp.employmentType} | ${exp.location} | ${exp.startDate} - ${exp.endDate}\n`
      exp.responsibilities.forEach((resp) => {
        txtContent += `• ${resp}\n`
      })
      txtContent += "\n"
    })

    txtContent += `EDUCATION\n${"=".repeat(50)}\n`
    cvData.education.forEach((edu) => {
      txtContent += `${edu.degree} - ${edu.institutionName}\n`
      txtContent += `${edu.startYear} - ${edu.endYear} | Grade: ${edu.grade}\n\n`
    })

    txtContent += `SKILLS\n${"=".repeat(50)}\n${cvData.skills.join(", ")}\n\n`

    txtContent += `PROJECTS\n${"=".repeat(50)}\n`
    cvData.projects.forEach((proj) => {
      txtContent += `${proj.projectName}\n`
      txtContent += `Tags: ${proj.projectTags}\n`
      txtContent += `${proj.projectDescription}\n\n`
    })

    txtContent += `LANGUAGES\n${"=".repeat(50)}\n`
    cvData.languages.forEach((lang) => {
      txtContent += `${lang.language} - ${lang.level}\n`
    })

    const blob = new Blob([txtContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${cvData.fullName.replace(/\s+/g, "_")}_CV.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setShowMenu(false)
  }

  const handleCopyToClipboard = () => {
    let txtContent = `${cvData.fullName}\n`
    txtContent += `${cvData.jobTitle}\n`
    txtContent += `${cvData.cityCountry} | ${cvData.phoneNumber} | ${cvData.email}\n`
    txtContent += `Portfolio: ${cvData.portfolioUrl}\n`
    txtContent += `LinkedIn: ${cvData.linkedinUrl}\n`
    txtContent += `GitHub: ${cvData.githubUrl}\n\n`

    txtContent += `SUMMARY\n${cvData.summaryText}\n\n`

    txtContent += `EXPERIENCE\n`
    cvData.experience.forEach((exp) => {
      txtContent += `${exp.jobTitle} - ${exp.companyName}\n`
      txtContent += `${exp.employmentType} | ${exp.location} | ${exp.startDate} - ${exp.endDate}\n`
      exp.responsibilities.forEach((resp) => {
        txtContent += `• ${resp}\n`
      })
      txtContent += "\n"
    })

    navigator.clipboard.writeText(txtContent)
    alert("CV copied to clipboard!")
    setShowMenu(false)
  }

  const handleEmailShare = () => {
    let emailBody = `${cvData.fullName}\n`
    emailBody += `${cvData.jobTitle}\n`
    emailBody += `${cvData.cityCountry} | ${cvData.phoneNumber} | ${cvData.email}\n`
    emailBody += `Portfolio: ${cvData.portfolioUrl}\n`
    emailBody += `LinkedIn: ${cvData.linkedinUrl}\n`
    emailBody += `GitHub: ${cvData.githubUrl}\n\n`
    emailBody += `SUMMARY\n${cvData.summaryText}`

    const subject = `CV - ${cvData.fullName}`
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`
    window.location.href = mailtoLink
    setShowMenu(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 lg:p-8 max-w-7xl mx-auto">
        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <CVForm cvData={cvData} setCvData={setCvData} />
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-8 h-fit max-h-[calc(100vh-4rem)] flex flex-col">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex items-center justify-between">
            <h2 className="text-white font-semibold">CV Preview</h2>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                <Download size={18} />
                Export
                <ChevronDown size={16} />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <button
                    onClick={handleDownloadHTML}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center gap-3 border-b border-gray-100"
                  >
                    <Code size={18} className="text-blue-600" />
                    <div>
                      <div className="font-medium text-sm">Export as HTML</div>
                      <div className="text-xs text-gray-600">Print to PDF</div>
                    </div>
                  </button>
                  <button
                    onClick={handleDownloadJSON}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center gap-3 border-b border-gray-100"
                  >
                    <FileJson size={18} className="text-blue-600" />
                    <div>
                      <div className="font-medium text-sm">Export as JSON</div>
                      <div className="text-xs text-gray-600">Data backup</div>
                    </div>
                  </button>
                  <button
                    onClick={handleDownloadTXT}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center gap-3 border-b border-gray-100"
                  >
                    <FileText size={18} className="text-blue-600" />
                    <div>
                      <div className="font-medium text-sm">Export as TXT</div>
                      <div className="text-xs text-gray-600">Plain text</div>
                    </div>
                  </button>
                  <button
                    onClick={handleCopyToClipboard}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center gap-3 border-b border-gray-100"
                  >
                    <Copy size={18} className="text-blue-600" />
                    <div>
                      <div className="font-medium text-sm">Copy to Clipboard</div>
                      <div className="text-xs text-gray-600">Paste anywhere</div>
                    </div>
                  </button>
                  <button
                    onClick={handleEmailShare}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center gap-3"
                  >
                    <Mail size={18} className="text-blue-600" />
                    <div>
                      <div className="font-medium text-sm">Share via Email</div>
                      <div className="text-xs text-gray-600">Send CV via email</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
          <CVPreview cvData={cvData} />
        </div>
      </div>
    </div>
  )
}
