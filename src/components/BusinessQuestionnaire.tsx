import React, { useState } from 'react'

interface BusinessQuestionnaireProps {
  onSubmit: (data: any) => void
}

interface TaskType {
  value: string
  label: string
  group: string
}

const taskTypes: TaskType[] = [
  { value: 'likes_shares', label: 'Likes & Shares', group: 'Engagement' },
  { value: 'comments_tagging', label: 'Comments & Tagging', group: 'Engagement' },
  { value: 'follows_subscriptions', label: 'Follows & Subscriptions', group: 'Growth' },
  { value: 'ugc', label: 'User-Generated Content (UGC)', group: 'Content Creation' },
  { value: 'reviews_testimonials', label: 'Product Reviews & Testimonials', group: 'Content Creation' },
  { value: 'blog_posts', label: 'Blog Posts & Articles', group: 'Content Creation' },
  { value: 'surveys_polls', label: 'Surveys & Poll Participation', group: 'Feedback' },
  { value: 'stories_hashtags', label: 'Story/Status Updates & Hashtag Promotion', group: 'Promotion' },
  { value: 'live_streaming', label: 'Live Streaming & Event Promotion', group: 'Promotion' },
  { value: 'contests_referrals', label: 'Contests, Giveaways & Referral Sharing', group: 'Growth' },
]

const BusinessQuestionnaire: React.FC<BusinessQuestionnaireProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    businessDescription: '',
    businessLogoUrl: '',
    businessLogoFile: null as File | null,
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    businessAddress: '',
    websiteUrl: '',
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    linkedinUrl: '',
    youtubeUrl: '',
    tiktokUrl: '',
    role: '',
    growthGoal: '',
    businessType: '',
    preferredTaskTypes: [] as string[],
    defaultRewardType: '',
    campaignBudget: '',
    quotaSettings: '',
  })

  const [isTaskTypesOpen, setIsTaskTypesOpen] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prevData => ({
        ...prevData,
        businessLogoFile: e.target.files![0]
      }))
    }
  }

  const handleTaskTypeToggle = (value: string) => {
    setFormData(prevData => ({
      ...prevData,
      preferredTaskTypes: prevData.preferredTaskTypes.includes(value)
        ? prevData.preferredTaskTypes.filter(type => type !== value)
        : [...prevData.preferredTaskTypes, value]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const renderInput = (name: string, label: string, type: string = 'text', placeholder: string = '') => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
        placeholder={placeholder}
        value={formData[name as keyof typeof formData] as string}
        onChange={handleChange}
        required
      />
    </div>
  )

  const renderTextarea = (name: string, label: string, placeholder: string = '') => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
        placeholder={placeholder}
        value={formData[name as keyof typeof formData] as string}
        onChange={handleChange}
        required
      />
    </div>
  )

  const renderSelect = (name: string, label: string, options: string[]) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
        value={formData[name as keyof typeof formData] as string}
        onChange={handleChange}
        required
      >
        <option value="">Select an option</option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )

  const renderCustomMultiSelect = () => (
    <div className="mb-4 relative">
      <label htmlFor="preferredTaskTypes" className="block text-gray-700 text-sm font-bold mb-2">
        Preferred Task Types
      </label>
      <div
        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500 cursor-pointer"
        onClick={() => setIsTaskTypesOpen(!isTaskTypesOpen)}
      >
        {formData.preferredTaskTypes.length === 0 ? (
          <span className="text-gray-500">Select task types...</span>
        ) : (
          <div className="flex flex-wrap gap-1">
            {formData.preferredTaskTypes.map(type => (
              <span key={type} className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {taskTypes.find(t => t.value === type)?.label}
              </span>
            ))}
          </div>
        )}
      </div>
      {isTaskTypesOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {Array.from(new Set(taskTypes.map(t => t.group))).map(group => (
            <div key={group} className="p-2">
              <h4 className="font-semibold text-gray-700">{group}</h4>
              {taskTypes.filter(t => t.group === group).map(type => (
                <div key={type.value} className="flex items-center p-2 hover:bg-gray-100">
                  <input
                    type="checkbox"
                    id={type.value}
                    checked={formData.preferredTaskTypes.includes(type.value)}
                    onChange={() => handleTaskTypeToggle(type.value)}
                    className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <label htmlFor={type.value} className="ml-2 text-sm text-gray-700">
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">Tell Us About Your Business</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-orange-500">Business Information</h3>
          {renderInput('businessName', 'Business Name')}
          {renderTextarea('businessDescription', 'Business Description')}
          {renderInput('businessLogoUrl', 'Business Logo URL')}
          <div className="mb-4">
            <label htmlFor="businessLogoFile" className="block text-gray-700 text-sm font-bold mb-2">
              Upload Business Logo
            </label>
            <input
              type="file"
              id="businessLogoFile"
              onChange={handleFileChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
              accept="image/*"
            />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-orange-500">Contact Information</h3>
          {renderInput('contactName', 'Contact Name')}
          {renderInput('contactEmail', 'Contact Email', 'email')}
          {renderInput('contactPhone', 'Contact Phone', 'tel')}
          {renderInput('businessAddress', 'Business Address')}
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-orange-500">Online Presence</h3>
          {renderInput('websiteUrl', 'Website URL', 'url')}
          {renderInput('facebookUrl', 'Facebook URL', 'url')}
          {renderInput('twitterUrl', 'Twitter URL', 'url')}
          {renderInput('instagramUrl', 'Instagram URL', 'url')}
          {renderInput('linkedinUrl', 'LinkedIn URL', 'url')}
          {renderInput('youtubeUrl', 'YouTube URL', 'url')}
          {renderInput('tiktokUrl', 'TikTok URL', 'url')}
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-orange-500">Business Goals</h3>
          {renderInput('role', "Your Role")}
          {renderTextarea('growthGoal', 'Growth Goal for Next 5-6 Months')}
          {renderInput('businessType', 'Type of Business')}
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-orange-500">Campaign Preferences</h3>
          {renderCustomMultiSelect()}
          {renderSelect('defaultRewardType', 'Default Reward Type', ['Tokens', 'Cash', 'Products'])}
          {renderInput('campaignBudget', 'Campaign Budget', 'number')}
          {renderInput('quotaSettings', 'Quota Settings (Max Influencers per Task)', 'number')}
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default BusinessQuestionnaire