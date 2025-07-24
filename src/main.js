import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'

const background = document.getElementById('background');
const app = document.getElementById('job-listings');
const filterContainer = document.getElementById('filter-container');
const filterTagsContainer = document.getElementById('filter-tags-container');
let filterTags = [];

async function getJobList() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error fetching job list:', error);
    }
}

const jobList = await getJobList();
console.log(jobList);

function showJob(job) {
  const { company, logo, new: isNew, featured, position, role, level, postedAt, contract, location, languages, tools } = job;

  const jobEle = document.createElement('div');
  jobEle.classList.add('flex', 'p-6', 'items-center', 'gap-4', 'w-full', 'bg-white', 'rounded-[5px]', 'shadow-lg', 'border-l-4', 'max-sm:flex-col', 'max-sm:items-start');
  jobEle.style.borderLeftColor = featured ? 'var(--color-green-400)' : 'transparent';

  jobEle.innerHTML = `
      <img src="${logo}" alt="avartar" class="w-15 h-15 rounded-full"> 

      <div class="flex flex-col gap-1.5">
        <div class="flex gap-3 items-center" id="job-info">
          <p class="text-[var(--color-green-400)] font-bold">${company}</p>
        </div>

        <p class="font-bold cursor-pointer hover:text-[var(--color-green-400)]">${position}</p>

        <div class="flex gap-2 text-[var(--color-gray-400)]">
          <p>${postedAt}</p> 
          &bull;
          <p>${contract}</p>
          &bull;
          <p>${location}</p>
        </div>
      </div>

      <div class="flex flex-auto gap-2 justify-end flex-wrap max-sm:justify-start max-sm:gap-3" id="job-tags"></div>
  `;
  
  const jobInfo = jobEle.querySelector('#job-info');
  const jobTags = jobEle.querySelector('#job-tags');
  
  if (isNew) {
    const newButton = document.createElement('button');
    newButton.classList.add ('bg-[var(--color-green-400)]', 'text-white', 'px-1.5', 'py-0.5', 'rounded-[10px]', 'font-bold', 'cursor-pointer', 'flex', 'items-center', 'justify-center');
    newButton.textContent = 'NEW!';
    jobInfo.appendChild(newButton);
  }

  if (featured) {
    const featuredButton = document.createElement('button');
    featuredButton.classList.add ('bg-[var(--color-green-900)]', 'text-white', 'px-1.5', 'py-0.5', 'rounded-[10px]', 'font-bold', 'cursor-pointer', 'flex', 'items-center', 'justify-center');
    featuredButton.textContent = 'FEATURED';
    jobInfo.appendChild(featuredButton);
  }

  const tags = [role, level, ...languages, ...tools];
  tags.forEach(tag => { 
    const tagButton = document.createElement('button');
    tagButton.classList.add('bg-[var(--color-green-50)]', 'text-[var(--color-green-400)]', 'p-1.5', 'rounded-[5px]', 'font-bold', 'cursor-pointer', 'hover:bg-[var(--color-green-400)]', 'hover:text-white');
    tagButton.textContent = tag;

    tagButton.addEventListener('click', () => { 
      if (!filterTags.includes(tag)) {
        filterTags.push(tag);

        const tagElement = document.createElement('div');
        tagElement.classList.add('flex');
        tagElement.innerHTML = `
          <div
            class="bg-[var(--color-green-50)] text-[var(--color-green-400)] p-1.5 rounded-tl-[5px] rounded-bl-[5px] font-bold">${tag}</div>

          <div class="text-white bg-[var(--color-green-400)] hover:bg-black flex items-center justify-center p-2 cursor-pointer rounded-tr-[5px] rounded-br-[5px]" id="clear-tag"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
            <path fill="#FFF" fill-rule="evenodd"
              d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z" />
          </svg></div>
        `;

        tagElement.querySelector('#clear-tag').addEventListener('click', () => { 
          filterTags = filterTags.filter(t => t !== tag);
          tagElement.remove();

          if (filterTags.length == 0) {
            filterContainer.classList.add('hidden');
            showFullJob();
          }
          else showJobFilter();
        });
        filterTagsContainer.appendChild(tagElement);
        showJobFilter();
      }

      document.querySelector("#clear-btn").addEventListener('click', () => {
        filterTags = [];
        filterTagsContainer.innerHTML = '';
        filterContainer.classList.add('hidden');
        showFullJob();
      });
    });

    jobTags.appendChild(tagButton);
  });

  app.appendChild (jobEle);
}

function showFullJob() {
  app.innerHTML = '';
  jobList.forEach(job => {
    showJob(job);
  });
}
function showJobFilter() {
  app.innerHTML = '';
  filterContainer.classList.remove('hidden');
  filterContainer.classList.add('flex');
  jobList.forEach(job => {
    const jobTags = [job.role, job.level, ...job.languages, ...job.tools];
    if (filterTags.every(tag => jobTags.includes(tag))) {
      showJob(job);
    }
  });
}
showFullJob();