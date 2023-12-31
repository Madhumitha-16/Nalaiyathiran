import React, { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import Loading from '../../Components/Loading';
import { Table } from 'antd';
import { Button, Modal } from 'antd';
import { collection, getDocs, query, where } from "firebase/firestore"; // Import necessary Firestore functions


export default function ViewSubmissions() {
    // const [data,setData]=useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [mergedData, setMergedData] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Step 1: Fetch Team_details
    const teamDetailsData = [];
    const teamDetailsCollection = collection(db, "Team_Details"); // Get the collection reference

    getDocs(teamDetailsCollection)
      .then((teamDetailsSnapshot) => {
        teamDetailsSnapshot.forEach((doc) => {
          const teamDetail = doc.data();
          teamDetailsData.push({ id: doc.id, ...teamDetail });
        });

        

        // Get all userids from the Team_details data
        const userIds = teamDetailsData.map((teamDetail) => teamDetail.userid);
        console.log(userIds);
        // Step 2: Fetch Phase1 using query
        const phase1Collection = collection(db, "PhaseI"); // Get the collection reference

        const phase1Query = query(phase1Collection, where("userid", "in", userIds));

        getDocs(phase1Query)
          .then((phase1Snapshot) => {
            const phase1Data = [];
            phase1Snapshot.forEach((doc) => {
              const phase1 = doc.data();
              phase1Data.push({ id: doc.id, ...phase1 });
            });

            // Step 3: Merge the data based on userid
            const mergedData = teamDetailsData.map((teamDetail) => {
              const userId = teamDetail.userid;
              const associatedPhase1 = phase1Data.find((phase1) => phase1.userid === userId);
              return {
                ...teamDetail,
                phase1_domain: associatedPhase1?.Domain || null,
                phase1_project_title: associatedPhase1?.Project_Title || null,
                phase1_id: associatedPhase1?.id || null,
              };
            });

            setMergedData(mergedData);
            console.log(mergedData);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching Phase1 data: ", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching Team_details data: ", error);
      });
  }, []);


  

    const columns = [
        {
          title: "Team Leader",
          dataIndex: 'Team_Leader_firstname',
          width: '15%',
        },
        {
          title: 'Mentor',
          dataIndex: 'mentor',
          width: '15%',
          render: (text) => (
            <span style={{ color: text ? 'inherit' : 'red' }}>
              {text ? text : 'Not Assigned'}
            </span>
          ),
        },
        {
            title: 'Project Domain',
            dataIndex: 'phase1_domain',
            width: '15%',
            render: (text) => (
              <span style={{ color: text ? 'inherit' : 'red' }}>
                {text ? text : 'Not Submitted'}
              </span>
            ),
            filters: [
              {
                text: 'IoT',
                value: 'IoT',
              },
              {
                text: 'IoT with AI',
                value: 'IoT with AI',
              },
              {
                text: 'IoT with Cloud',
                value: 'IoT with Cloud',
              },
              {
                text: 'IoT with AR/VR',
                value: 'IoT with AR/VR',
              },
            ],
           filterMode: 'tree',
          filterSearch: true,
          onFilter: (value, record) => {
            const domain = record.phase1_domain;
            if (domain === null || domain === undefined) {
              return "Not Submitted";
            }
            return domain.startsWith(value);
          },
          },
        {
          title: 'Project Title',
          dataIndex: 'phase1_project_title',
          width: '10%',
          render: (text) => (
            <span style={{ color: text ? 'inherit' : 'red' }}>
              {text ? text : 'Not Submitted'}
            </span>
          ),
        },
        {
          title: 'Phase 1',
          dataIndex: 'phase1_id',
          width: '10%',
          render: (text) => (
            <span style={{ color: text ? 'green' : 'red' }}>
              {text ? "Submitted" : 'Not Submitted'}
            </span>
          ),
          filters: [
            {
              text: 'Submitted',
              value: 'Submitted',
            },
            {
              text: 'Not Submitted',
              value: 'Not Submitted',
            },
          ],
          filterMode: 'tree',
          filterSearch: true,
          onFilter: (value, record) => {
            const phase_1 = record.phase1_id;
            if (phase_1 === null || phase_1 === undefined) {
              return value === 'Not Submitted'; // Filter when value is "Not Submitted"
            }
            return phase_1 === value; // Filter based on exact match
          },
        },
          {
            title: 'Phase 2',
            dataIndex: 'phase_2',
            width: '10%',
            render: (text) => (
              <span style={{ color: text ? 'inherit' : 'red' }}>
                {text ? "Submitted" : 'Not Submitted'}
              </span>
            ),
            filters: [
              {
                text: 'Submitted',
                value: 'Submitted',
              },
              {
                text: 'Not Submitted',
                value: 'Not Submitted',
              },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => {
              const phase_1 = record.phase_1;
              if (phase_1 === null || phase_1 === undefined) {
                return value === 'Not Submitted'; // Filter when value is "Not Submitted"
              }
              return phase_1 === value; // Filter based on exact match
            },
          },
          {
            title: 'Phase 3',
            dataIndex: 'phase_3',
            width: '10%',
            render: (text) => (
              <span style={{ color: text ? 'green' : 'red' }}>
                {text ? "Submitted" : 'Not Submitted'}
              </span>
            ),
            filters: [
              {
                text: 'Submitted',
                value: 'Submitted',
              },
              {
                text: 'Not Submitted',
                value: 'Not Submitted',
              },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => {
              const phase_1 = record.phase_1;
              if (phase_1 === null || phase_1 === undefined) {
                return value === 'Not Submitted'; // Filter when value is "Not Submitted"
              }
              return phase_1 === value; // Filter based on exact match
            },
          },

       
      ];

      const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };
    return (
        <div className='bodyWrap dashboardPage'>
        <div className='heading'>
        <h2>Submissions</h2>  
        <hr></hr>
        <Table columns={columns} dataSource={mergedData} onChange={onChange} loading={loading}/>
    </div>
    <div>
   
</div>
</div>

 
  )
}
