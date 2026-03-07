export interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
  contestRating: number;
  contestGlobalRanking: number;
  totalSubmissions: number;
  streak: number;
  maxStreak: number;
}

export interface CalendarData {
  date: string;
  count: number;
  level: number;
}

export async function fetchLeetCodeStats(username: string): Promise<LeetCodeStats> {
  try {
    const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }
    
    const data = await response.json();
    console.log('LeetCode Stats API Response:', data);

    if (!data) throw new Error('No data returned');

    return {
      totalSolved: data.totalSolved || 0,
      easySolved: data.easySolved || 0,
      mediumSolved: data.mediumSolved || 0,
      hardSolved: data.hardSolved || 0,
      ranking: data.ranking || 0,
      contributionPoints: data.contributionPoints || 0,
      reputation: data.reputation || 0,
      contestRating: 0,
      contestGlobalRanking: 0,
      totalSubmissions: data.totalSolved || 0,
      streak: 0,
      maxStreak: 0
    };
  } catch (error) {
    console.error('LeetCode stats error:', error);
    throw error;
  }
}

export async function fetchLeetCodeCalendar(username: string): Promise<CalendarData[]> {
  try {
    console.log('Fetching calendar for:', username);
    
    const query = `
      query userCalendar($username: String!) {
        matchedUser(username: $username) {
          calendar {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDay {
                  date
                  contributionCount
                  contributionLevel
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username }
      })
    });

    if (!response.ok) {
      throw new Error(`GraphQL API returned ${response.status}`);
    }

    const data = await response.json();
    console.log('LeetCode Calendar API Response:', data);

    if (!data.data?.matchedUser?.calendar?.contributionCalendar?.weeks) {
      console.warn('No calendar data found');
      return [];
    }

    const weeks = data.data.matchedUser.calendar.contributionCalendar.weeks;
    const calendarData: CalendarData[] = [];

    weeks.forEach((week: any) => {
      week.contributionDay.forEach((day: any) => {
        calendarData.push({
          date: day.date,
          count: day.contributionCount,
          level: day.contributionLevel
        });
      });
    });

    console.log('Parsed calendar data:', calendarData.length, 'days');
    return calendarData;
  } catch (error) {
    console.error('LeetCode calendar error:', error);
    return [];
  }
}
