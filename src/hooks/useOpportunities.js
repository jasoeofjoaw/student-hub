import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../lib/supabase'

export const TYPES = ['竞赛', '活动', '实习', '科研', '其他']
export const HOT_TAGS = ['前端开发', '金融', '数据分析', '保研', '大创', '互联网+']

export function useOpportunities() {
  const [allData, setAllData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [tagFilter, setTagFilter] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const { data, error: supabaseError } = await supabase
          .from('opportunities')
          .select('*')
          .order('deadline', { ascending: true })

        if (supabaseError) throw supabaseError
        setAllData(data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const opportunities = useMemo(() => {
    let result = allData

    if (search.trim()) {
      const keyword = search.trim().toLowerCase()
      result = result.filter(
        (item) =>
          item.title?.toLowerCase().includes(keyword) ||
          item.summary?.toLowerCase().includes(keyword)
      )
    }

    if (typeFilter) {
      result = result.filter((item) => item.type === typeFilter)
    }

    if (tagFilter) {
      result = result.filter((item) => {
        const tags = item.tags?.split(',').map((t) => t.trim()) || []
        return tags.includes(tagFilter)
      })
    }

    return result
  }, [allData, search, typeFilter, tagFilter])

  return {
    opportunities,
    loading,
    error,
    search,
    setSearch,
    typeFilter,
    setTypeFilter,
    tagFilter,
    setTagFilter,
  }
}
