from skilly.framework.db.src.model.entity.skilly_entity import Entity
from skilly.framework.utils.src.decorators.skilly_decorators import entity
from skilly.framework.db.src.model.orm.skilly_sql_orm import Sql


class UserService:

  @classmethod
  def getUser(cls, userId):
    # call the repository method to get a user by its ID
    user: User = UserRepository.getByUser_idEq(userId)
    # check if user is null
    if user is None:
      return ResponseHandler.send().NOT_FOUND("No user found")
    else:
      return ResponseHandler(user.toJSON()).OK("User found")

  
  @classmethod
  def getUsersByNameAndMoney(cls, name, money):
    # call the repository method to get a user by its name and money
    users: list[User] = UserRepository.getByNameEqAndMoneyGt(name, money)

    result = []
    for user in users:
      result.append(user.toJSON())

    return ResponseHandler(result).OK("Users found")

  
  @classmethod
  def getUserAndNewParameter(cls, userId):
    user: User = UserRepository.getByUser_idEq(userId)
    if user is None:
      return ResponseHandler.send().NOT_FOUND("No user found")
    else:
      # instead of calling the method toJSON(), you can
      # add some parameters to it and they will be added to
      # the default JSON
      return ResponseHandler(user.toJSON(newParameter='Hello', ...)).OK("User found")


@classmethod
def updateName(cls, userId, newName):
  # call the repository method to get a user by its name and money
  user: User = UserRepository.getByUser_idEq(userId)
  if user is None:
    return ResponseHandler.send().NOT_FOUND("No user found with this ID")
  else:
    user.name = newName
    user.update()
    return ResponseHandler(user.toJSON()).OK("User updated")


@classmethod
def deleteUser(cls, userId):
  # call the repository method to get a user by its name and money
  user: User = UserRepository.getByUser_idEq(userId)
  if user is None:
    return ResponseHandler.send().NOT_FOUND("No user found with this ID")
  else:
    user.delete()
    return ResponseHandler().OK("User deleted")


@classmethod
def createUser(cls, body):
  # create user object
  user: User = User(
    body['name'], 
    body['surname'], 
    body['birthday'], 
    body['money']
  )
  user.save()
  return ResponseHandler(user.toJSON()).OK("User created")


@classmethod
def joinQuery(cls, companyId):
  users: list[User] = \
          UserRepository
          .startJoin(User, Workers)
          .on("User.user_id", "Workers.user_id")
          .where("Workers.company_id", "=", companyId)
          .execute()
  # it's going to return an array of rows, every row has two or more 
  # entitiy objects, depending on the amount of joined tables
  # [ [User, Worker], [User, Worker] ... ]


@classmethod
def joinThreeQuery(cls, companyName):
  users: list[User] = \
          UserRepository
          .startJoin(User, Workers)
          .on("User.user_id", "Workers.user_id")
          .join(Company)
          .on("Workers.company_id", "Company.company_id")
          .where("Company.companyName", "=", companyName)
          .execute()
  # it's going to return an array of rows, every row has two or more 
  # entitiy objects, depending on the amount of joined tables
  # [ [User, Worker, Company], [User, Worker, Company] ... ]


@classmethod
def customQuery(cls, userMoney):
  users: list[User] = UserRepository.manualQBN(
    True, # fetchall, boolean
    "SELECT COUNT(*), user.name FROM user GROUP BY money" # query
    Attr("count(*)"), # attribute 1 of the returned objects
    Attr("name"), # attribute 2 of the returned objects
  )
  # it's going to return an array of generic entitis, having the attributes you passed through Attr()
  # [ GenericEntity, GenericEntity, ...]