<script lang="ts">
  import type { PageData } from './$types';
  import StatCard from '$lib/components/dashboard/StatCard.svelte';
  import RecentDecksTable from '$lib/components/dashboard/RecentDecksTable.svelte';

  export let data: PageData;

  const activity = [
    { title: 'Andrea edited Slide 03', deck: 'Investor Pitch Deck', age: '2h ago', tone: 'violet' },
    { title: 'Smart Edit applied', deck: '4 slides updated', age: '4h ago', tone: 'green' },
    { title: 'Sarah commented', deck: 'On Slide 07', age: '5h ago', tone: 'blue' },
    { title: 'Deck exported', deck: 'Investor Pitch Deck.pdf', age: '1d ago', tone: 'amber' },
    { title: 'Mike shared the deck', deck: 'Series A Pitch Deck', age: '1d ago', tone: 'indigo' }
  ];

  const quickActions = [
    { title: 'New Deck', detail: 'Start from scratch', tone: 'violet', href: '/decks/new' },
    { title: 'Smart Edit', detail: 'Apply controlled updates', tone: 'green', href: '/decks/deck-001/smart-edit' },
    { title: 'Rebuild Deck', detail: 'Apply structural changes', tone: 'amber', href: '/decks/deck-001/rebuild' },
    { title: 'Import Deck', detail: 'Bring in PPTX or PDF', tone: 'blue', href: '/decks/new' },
    { title: 'Export Deck', detail: 'Generate final assets', tone: 'indigo', href: '/decks/deck-001/exports' },
    { title: 'Share Deck', detail: 'Open review surface', tone: 'green', href: '/decks/deck-001/reviews' }
  ];

  const tasks = [
    { title: 'Review feedback on Slide 04', deck: 'Investor Pitch Deck', priority: 'High', due: 'Due today' },
    { title: 'Finalize Smart Edit changes', deck: 'Series A Pitch Deck', priority: 'Medium', due: 'Due tomorrow' },
    { title: 'Rebuild metrics across pages', deck: 'Q2 Financial Update', priority: 'Low', due: 'Due in 3 days' }
  ];

  $: workspaceStats = [
    { label: 'Total Decks', value: `${data.decks.length}`, delta: '+ 4 this month', tone: 'violet' },
    { label: 'In Progress', value: `${data.decks.filter((deck) => deck.status === 'draft' || deck.status === 'in-review').length}`, delta: '+ 2 this week', tone: 'blue' },
    { label: 'Ready for Review', value: `${data.decks.filter((deck) => deck.status === 'in-review').length}`, delta: 'Due this week', tone: 'amber' },
    { label: 'Published', value: `${data.decks.filter((deck) => deck.status === 'investor-ready').length}`, delta: '+ 3 this month', tone: 'green' }
  ];
</script>

<section class="dashboard-hero">
  <div>
    <h1>Good morning, {data.account.user.displayName}.</h1>
    <p>Here’s what’s happening with your decks today.</p>
  </div>
</section>

<section class="stat-grid stat-grid-dashboard">
  {#each workspaceStats as stat}
    <StatCard {...stat} />
  {/each}
</section>

<section class="dashboard-grid">
  <article class="panel dashboard-panel dashboard-panel-wide">
    <div class="dashboard-panel-head">
      <h2>Recent Decks</h2>
      <a href="/decks">View all decks</a>
    </div>
    <RecentDecksTable decks={data.decks} />
  </article>

  <article class="panel dashboard-panel">
    <div class="dashboard-panel-head">
      <h2>Recent Activity</h2>
      <a href="/decks">View all activity</a>
    </div>
    <div class="dashboard-activity-list">
      {#each activity as item}
        <div class="dashboard-activity-row">
          <div class={`dashboard-activity-icon ${item.tone}`}></div>
          <div>
            <strong>{item.title}</strong>
            <p>{item.deck}</p>
          </div>
          <small>{item.age}</small>
        </div>
      {/each}
    </div>
  </article>
</section>

<section class="dashboard-grid">
  <article class="panel dashboard-panel dashboard-panel-wide">
    <div class="dashboard-panel-head">
      <h2>My Tasks</h2>
      <a href="/decks">View all tasks</a>
    </div>
    <div class="dashboard-task-list">
      {#each tasks as task}
        <div class="dashboard-task-row">
          <div class="dashboard-task-copy">
            <strong>{task.title}</strong>
            <p>{task.deck}</p>
          </div>
          <span class={`task-priority priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
          <small>{task.due}</small>
        </div>
      {/each}
    </div>
  </article>

  <article class="panel dashboard-panel">
    <div class="dashboard-panel-head">
      <h2>Quick Actions</h2>
    </div>
    <div class="dashboard-action-grid">
      {#each quickActions as action}
        <a class="dashboard-action-card" href={action.href}>
          <div class={`dashboard-action-icon ${action.tone}`}></div>
          <strong>{action.title}</strong>
          <p>{action.detail}</p>
        </a>
      {/each}
    </div>
  </article>
</section>

<section class="panel dashboard-banner">
  <div class="dashboard-banner-art"></div>
  <div class="dashboard-banner-copy">
    <strong>New: Feedback Learning is now available</strong>
    <p>Turn your reviews into smarter decks. Train the system with your preferences and get better results over time.</p>
  </div>
  <a class="primary-button" href="/decks/deck-001/reviews">Explore Feedback</a>
</section>
