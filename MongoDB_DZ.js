1) ������ ��� ���� � ���� ������ ������ 4.2
db.getCollection('students').find({avgScore: 4.2})

2) ������ ��� ���� � 1 �����
db.getCollection('students').find({class: 1})

3) ������ ��� ���� �� �������� ������
db.getCollection('students').find({'lessons': 'physics'})

4) ������ ��� ����, ������ ���� �������� � ����� 
( scientist )
db.getCollection('students').find({'parents.profession': 'scientist' })

5) ������ ����, � ���� ������� ������ ����� �� 4
db.getCollection('students').find({avgScore: {$gt: 4}})

6) ������ ���������� ����
db.getCollection('students')
.find({})
.sort({avgScore: -1})
.limit(1)
.skip(0)

7) ������ ��������� ����
db.getCollection('students')
.find({})
.sort({avgScore: 1})
.limit(1)
.skip(0)

8) ������ ��� 3 ����
db.getCollection('students')
.find({})
.sort({avgScore: -1})
.limit(3)
.skip(0)

9) ������ ������� ��� �� ����
db.getCollection('students').aggregate([
{
    $group: {
        _id: 0,
        avgSchoolScore: {
            $avg: '$avgScore'
            }
        }
    },
    {
        $project: {
            avgSchoolScore: true,
            _id: 0
        }
    }
])

10) ������ ������� ��� ���� �� �������� ���������� ��� ������
db.getCollection('students').aggregate([ {   $match: {      $or: [        {lessons: 'mathematics'},                  {lessons: 'physics'}                ]   } },{    $group: {     _id: 0,     avgScore: {     $avg: '$avgScore'         }      } } ])

11) ������ ������� ��� �� 2 ����
db.getCollection('students').aggregate([
 {
   $match: {
      class: 2
   }
 },
{
    $group: {
     _id: 0,
     avgScore: {
     $avg: '$avgScore'    
     }   
   }
 } 
])

12) ������ ���� � �� ������ ���
db.getCollection('students').find({parents: {$size: 1}})

13) ������ ������ �� �� ��������
db.getCollection('students')
.aggregate([
{
    $match: {
        'parents': {$exists: true}
        }
    },
    {
  $unwind: "$parents"
},
{
    $match: {
        'parents.profession': {$exists: false}
        }
    },
    {
        $project: {
            _id: false,
            parents: true
            }
        }
])

14) �� ��������� ������ ���������� �����������
db.getCollection('students')
.aggregate([
{
    $match: {
        'parents': {$exists: true}
        }
    },
    {
  $unwind: "$parents"
},
{
    $match: {
        'parents.profession': {$exists: false}
        }
    },
    {
        $project: {
            _id: false,
            parents: true
            }
        },
    {
    $set : {
        'parents.proffesion': 'waiter'
        }
    }
])

15) ������� ����, �� ����� ������� ��� ����� �� 2.5
db.getCollection('students')
.remove({
    avgScore: {$lte: 2.5}
    })

16) ĳ���, ������ ���� �������� � ���� ( teacher ) ��������� 5
db.getCollection('students').updateMany(
{'parents.profession': 'teacher'},
{$set: {avgScore: 5}}
)

17) ������ ���� �� ������� � ��������� ���� (�� 5 �����) � �������� ������ ( physics )
db.getCollection('students').find({
    class: {$lte: 5},
    lessons: 'physics'
    })

18) ������ ����������� ����
db.getCollection('students').aggregate([
{
    $group: {
        _id: '$class',
        avgClassScore: {
            $avg: '$avgScore'
            
            }
        }
    },
    {
        $sort: {
            avgClassScore: -1
            }
        },
        { $limit: 1 }
])
