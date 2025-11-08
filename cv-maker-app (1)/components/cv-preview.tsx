"use client"

import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react"

interface CVData {
  fullName: string
  jobTitle: string
  cityCountry: string
  phoneNumber: string
  email: string
  portfolioUrl: string
  linkedinUrl: string
  githubUrl: string
  otherSocialUrls: string
  summaryText: string
  experience: any[]
  education: any[]
  skills: string[]
  projects: any[]
  certifications: any[]
  languages: any[]
  interests: string[]
}

export default function CVPreview({ cvData }: { cvData: CVData }) {
  return (
    <div id="cv-preview-content" className="overflow-y-auto max-h-[calc(100vh-8rem)] bg-white">
      <div className="p-8 space-y-6 text-slate-900">
        {/* Header */}
        <div className="border-b-2 border-blue-600 pb-6">
          <h1 className="text-4xl font-bold text-slate-900">{cvData.fullName}</h1>
          <p className="text-xl text-blue-600 font-semibold mt-1">{cvData.jobTitle}</p>

          {/* Contact Info */}
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-600">
            {cvData.cityCountry && (
              <div className="flex items-center gap-1">
                <MapPin size={16} className="text-blue-600" />
                <span>{cvData.cityCountry}</span>
              </div>
            )}
            {cvData.phoneNumber && (
              <div className="flex items-center gap-1">
                <Phone size={16} className="text-blue-600" />
                <span>{cvData.phoneNumber}</span>
              </div>
            )}
            {cvData.email && (
              <div className="flex items-center gap-1">
                <Mail size={16} className="text-blue-600" />
                <span>{cvData.email}</span>
              </div>
            )}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3 mt-3 text-sm">
            {cvData.portfolioUrl && (
              <a
                href={`https://${cvData.portfolioUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:underline"
              >
                <Globe size={16} />
                Portfolio
              </a>
            )}
            {cvData.linkedinUrl && (
              <a
                href={`https://${cvData.linkedinUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:underline"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            )}
            {cvData.githubUrl && (
              <a
                href={`https://${cvData.githubUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:underline"
              >
                <Github size={16} />
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* Summary */}
        {cvData.summaryText && (
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Professional Summary</h2>
            <p className="text-slate-700 leading-relaxed text-sm">{cvData.summaryText}</p>
          </div>
        )}

        {/* Experience */}
        {cvData.experience.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3">Work Experience</h2>
            <div className="space-y-4">
              {cvData.experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-blue-600 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-slate-900">{exp.jobTitle}</h3>
                      <p className="text-blue-600 font-medium">{exp.companyName}</p>
                    </div>
                    <span className="text-sm text-slate-600">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  {exp.location && <p className="text-sm text-slate-600 mt-1">{exp.location}</p>}
                  {exp.employmentType && <p className="text-sm text-slate-600">{exp.employmentType}</p>}
                  {exp.responsibilities.some((r: string) => r) && (
                    <ul className="mt-2 space-y-1 text-sm text-slate-700">
                      {exp.responsibilities.map(
                        (resp: string, idx: number) =>
                          resp && (
                            <li key={idx} className="flex gap-2">
                              <span className="text-blue-600 mt-1">•</span>
                              <span>{resp}</span>
                            </li>
                          ),
                      )}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {cvData.education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3">Education</h2>
            <div className="space-y-3">
              {cvData.education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-blue-600 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-slate-900">{edu.degree}</h3>
                      <p className="text-blue-600 font-medium">{edu.institutionName}</p>
                    </div>
                    <span className="text-sm text-slate-600">
                      {edu.startYear} — {edu.endYear}
                    </span>
                  </div>
                  {edu.grade && <p className="text-sm text-slate-600 mt-1">Grade: {edu.grade}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {cvData.skills.some((s: string) => s) && (
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {cvData.skills.map(
                (skill, idx) =>
                  skill && (
                    <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ),
              )}
            </div>
          </div>
        )}

        {/* Projects */}
        {cvData.projects.some((p: any) => p.projectName) && (
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3">Projects</h2>
            <div className="space-y-3">
              {cvData.projects.map(
                (proj) =>
                  proj.projectName && (
                    <div key={proj.id} className="border-l-2 border-blue-600 pl-4">
                      <h3 className="font-semibold text-slate-900">{proj.projectName}</h3>
                      {proj.projectTags && <p className="text-sm text-blue-600 font-medium">{proj.projectTags}</p>}
                      {proj.projectDescription && (
                        <p className="text-sm text-slate-700 mt-1">{proj.projectDescription}</p>
                      )}
                      {proj.projectLink && (
                        <a
                          href={proj.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline mt-1 inline-block"
                        >
                          View Project →
                        </a>
                      )}
                    </div>
                  ),
              )}
            </div>
          </div>
        )}

        {/* Interests */}
        {cvData.interests.some((i: string) => i) && (
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {cvData.interests.map(
                (interest, idx) =>
                  interest && (
                    <span key={idx} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                      {interest}
                    </span>
                  ),
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
