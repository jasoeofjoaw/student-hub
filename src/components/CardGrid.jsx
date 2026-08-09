import OpportunityCard from './OpportunityCard'

export default function CardGrid({ opportunities }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {opportunities.map((item) => (
        <OpportunityCard key={item.id || item.title} item={item} />
      ))}
    </div>
  )
}
